import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import Post from './post.model.js';

const postCommentDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true,
  },

  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },

  like_count: {
    type: Number,
    default: 0,
    min: 0,
  },
};

const PostComment = createBaseModel('PostComment', postCommentDefinition, (schema) => {
  schema.index({ post_id: 1, created_at: -1 });
  schema.index({ user_id: 1, created_at: -1 });

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const getSessionFromDoc = (doc) => (
    typeof doc.$session === 'function' ? doc.$session() : undefined
  );

  const addDelta = (map, postId, delta) => {
    if (!postId || !delta) return;
    const key = postId.toString();
    map[key] = (map[key] || 0) + delta;
  };

  const syncCommentCounts = async (postDeltaMap, session) => {
    const operations = Object.entries(postDeltaMap)
      .filter(([, delta]) => delta !== 0)
      .map(([postId, delta]) => ({
        updateOne: {
          filter: { _id: postId },
          update: { $inc: { comment_count: delta } },
        },
      }));

    if (operations.length > 0) {
      await Post.bulkWrite(operations, { session });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  | Handles:
  | - create
  | - doc.save() soft delete
  | - doc.save() restore
  |--------------------------------------------------------------------------
  */

  schema.pre('save', async function(next) {
    try {
      this.$locals = this.$locals || {};

      if (this.isNew) {
        this.$locals.commentDelta = this.is_deleted ? 0 : 1;
        return next();
      }

      if (!this.isModified('is_deleted')) {
        this.$locals.commentDelta = 0;
        return next();
      }

      const session = getSessionFromDoc(this);

      const existing = await this.constructor
        .findById(this._id)
        .select('post_id is_deleted')
        .session(session || null)
        .lean();

      if (!existing) {
        this.$locals.commentDelta = 0;
        return next();
      }

      let delta = 0;

      if (existing.is_deleted === false && this.is_deleted === true) {
        delta = -1;
      } else if (existing.is_deleted === true && this.is_deleted === false) {
        delta = 1;
      }

      this.$locals.commentDelta = delta;
      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post('save', async function(doc, next) {
    try {
      const delta = doc.$locals?.commentDelta || 0;
      if (!delta) return next();

      const session = getSessionFromDoc(doc);

      await Post.findByIdAndUpdate(
        doc.post_id,
        { $inc: { comment_count: delta } },
        { session }
      );

      next();
    } catch (error) {
      next(error);
    }
  });

  /*
  |--------------------------------------------------------------------------
  | FINDONEANDUPDATE / FINDBYIDANDUPDATE
  |--------------------------------------------------------------------------
  | Handles:
  | - soft delete
  | - restore
  |--------------------------------------------------------------------------
  */

  schema.pre('findOneAndUpdate', async function(next) {
    try {
      this._commentBefore = await this.model
        .findOne(this.getQuery())
        .select('_id post_id is_deleted')
        .session(this.getOptions().session || null)
        .lean();

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post('findOneAndUpdate', async function(result, next) {
    try {
      if (!this._commentBefore) return next();

      const update = this.getUpdate() || {};
      const nextIsDeleted =
        update.is_deleted ??
        update.$set?.is_deleted;

      if (typeof nextIsDeleted !== 'boolean') {
        return next();
      }

      let delta = 0;

      if (this._commentBefore.is_deleted === false && nextIsDeleted === true) {
        delta = -1;
      } else if (this._commentBefore.is_deleted === true && nextIsDeleted === false) {
        delta = 1;
      }

      if (!delta) return next();

      await Post.findByIdAndUpdate(
        this._commentBefore.post_id,
        { $inc: { comment_count: delta } },
        { session: this.getOptions().session }
      );

      next();
    } catch (error) {
      next(error);
    }
  });

  /*
  |--------------------------------------------------------------------------
  | UPDATEMANY
  |--------------------------------------------------------------------------
  | Handles bulk soft delete / restore
  |--------------------------------------------------------------------------
  */

  schema.pre('updateMany', async function(next) {
    try {
      this._commentsBefore = await this.model
        .find(this.getQuery())
        .select('post_id is_deleted')
        .session(this.getOptions().session || null)
        .lean();

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post('updateMany', async function(result, next) {
    try {
      const update = this.getUpdate() || {};
      const nextIsDeleted =
        update.is_deleted ??
        update.$set?.is_deleted;

      if (typeof nextIsDeleted !== 'boolean') {
        return next();
      }

      const deltas = {};

      for (const doc of this._commentsBefore || []) {
        if (doc.is_deleted === false && nextIsDeleted === true) {
          addDelta(deltas, doc.post_id, -1);
        } else if (doc.is_deleted === true && nextIsDeleted === false) {
          addDelta(deltas, doc.post_id, 1);
        }
      }

      await syncCommentCounts(deltas, this.getOptions().session);
      next();
    } catch (error) {
      next(error);
    }
  });

  /*
  |--------------------------------------------------------------------------
  | FINDONEANDDELETE / FINDBYIDANDDELETE
  |--------------------------------------------------------------------------
  */

  schema.pre('findOneAndDelete', async function(next) {
    try {
      this._commentToDelete = await this.model
        .findOne(this.getQuery())
        .select('_id post_id is_deleted')
        .session(this.getOptions().session || null)
        .lean();

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post('findOneAndDelete', async function(result, next) {
    try {
      const doc = this._commentToDelete;
      if (!doc || doc.is_deleted) return next();

      await Post.findByIdAndUpdate(
        doc.post_id,
        { $inc: { comment_count: -1 } },
        { session: this.getOptions().session }
      );

      next();
    } catch (error) {
      next(error);
    }
  });

  /*
  |--------------------------------------------------------------------------
  | DELETEMANY
  |--------------------------------------------------------------------------
  */

  schema.pre('deleteMany', async function(next) {
    try {
      this._commentsToDelete = await this.model
        .find(this.getQuery())
        .select('post_id is_deleted')
        .session(this.getOptions().session || null)
        .lean();

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post('deleteMany', async function(result, next) {
    try {
      const deltas = {};

      for (const doc of this._commentsToDelete || []) {
        if (!doc.is_deleted) {
          addDelta(deltas, doc.post_id, -1);
        }
      }

      await syncCommentCounts(deltas, this.getOptions().session);
      next();
    } catch (error) {
      next(error);
    }
  });
});

export { PostComment };
export default PostComment;