import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import Post, { REACTION_TYPES } from './post.model.js';

const postReactionDefinition = {
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  reaction_type: {
    type: String,
    enum: REACTION_TYPES,
    required: true,
  },
};

const PostReaction = createBaseModel('PostReaction', postReactionDefinition, (schema) => {
  schema.index(
    { post_id: 1, user_id: 1 },
    {
      unique: true,
      partialFilterExpression: { is_deleted: false },
    }
  );

  schema.index({ post_id: 1, reaction_type: 1 });
  schema.index({ user_id: 1, created_at: -1 });

  schema.statics.toggleReaction = async function(postId, userId, type) {
    if (!REACTION_TYPES.includes(type)) {
      const error = new Error(`Invalid reaction type: ${type}`);
      error.statusCode = 400;
      error.code = 'INVALID_REACTION_TYPE';
      throw error;
    }

    const session = await mongoose.startSession();

    try {
      let finalResult = null;

      await session.withTransaction(async () => {
        const post = await Post.findOne({
          _id: postId,
          is_deleted: false,
        }).session(session);

        if (!post) {
          const error = new Error('Post not found');
          error.statusCode = 404;
          error.code = 'POST_NOT_FOUND';
          throw error;
        }

        let existing = await this.findOne({
          post_id: postId,
          user_id: userId,
        }).session(session);

        if (!existing) {
          const createdDocs = await this.create(
            [
              {
                post_id: postId,
                user_id: userId,
                reaction_type: type,
              },
            ],
            { session }
          );

          finalResult = createdDocs[0];

          await Post.findByIdAndUpdate(
            postId,
            {
              $inc: {
                reaction_count: 1,
                [`reaction_counts.${type}`]: 1,
              },
            },
            { session }
          );

          return;
        }

        if (existing.is_deleted) {
          existing.is_deleted = false;
          existing.reaction_type = type;
          await existing.save({ session });

          await Post.findByIdAndUpdate(
            postId,
            {
              $inc: {
                reaction_count: 1,
                [`reaction_counts.${type}`]: 1,
              },
            },
            { session }
          );

          finalResult = existing;
          return;
        }

        if (existing.reaction_type === type) {
          existing.is_deleted = true;
          await existing.save({ session });

          await Post.findByIdAndUpdate(
            postId,
            {
              $inc: {
                reaction_count: -1,
                [`reaction_counts.${type}`]: -1,
              },
            },
            { session }
          );

          finalResult = existing;
          return;
        }

        const oldType = existing.reaction_type;

        existing.reaction_type = type;
        await existing.save({ session });

        await Post.findByIdAndUpdate(
          postId,
          {
            $inc: {
              [`reaction_counts.${oldType}`]: -1,
              [`reaction_counts.${type}`]: 1,
            },
          },
          { session }
        );

        finalResult = existing;
      });

      return finalResult;
    } catch (error) {
      if (error?.code === 11000) {
        const conflictError = new Error('Reaction was modified concurrently. Please retry.');
        conflictError.statusCode = 409;
        conflictError.code = 'REACTION_CONFLICT';
        throw conflictError;
      }

      throw error;
    } finally {
      await session.endSession();
    }
  };
});

export { PostReaction };
export default PostReaction;