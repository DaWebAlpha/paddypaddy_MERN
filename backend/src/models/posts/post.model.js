import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

export const REACTION_TYPES = ['like', 'love', 'wow', 'sad', 'angry'];

const postDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  caption: {
    type: String,
    trim: true,
    maxlength: 2200,
    default: '',
  },

  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published',
    index: true,
  },

  reaction_count: {
    type: Number,
    default: 0,
    min: 0,
  },

  reaction_counts: {
    like: { type: Number, default: 0, min: 0 },
    love: { type: Number, default: 0, min: 0 },
    wow: { type: Number, default: 0, min: 0 },
    sad: { type: Number, default: 0, min: 0 },
    angry: { type: Number, default: 0, min: 0 },
  },

  comment_count: {
    type: Number,
    default: 0,
    min: 0,
  },

  share_count: {
    type: Number,
    default: 0,
    min: 0,
  },

  view_count: {
    type: Number,
    default: 0,
    min: 0,
  },
};

const Post = createBaseModel('Post', postDefinition, (schema) => {
  schema.index({ user_id: 1, created_at: -1 });
  schema.index({ status: 1, created_at: -1 });
  schema.index({ user_id: 1, status: 1, created_at: -1 });

  schema.index(
    { created_at: -1 },
    {
      partialFilterExpression: {
        status: 'published',
        is_deleted: false,
      },
    }
  );

  schema.statics.REACTION_TYPES = REACTION_TYPES;
});

export { Post };
export default Post;