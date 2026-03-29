import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const postAttachmentDefinition = {
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

  type: {
    type: String,
    enum: ['image', 'video', 'audio', 'file', 'sticker', 'gif'],
    required: true,
    index: true,
  },

  url: {
    type: String,
    required: true,
    trim: true,
  },

  thumbnail_url: {
    type: String,
    trim: true,
    default: null,
  },

  filename: {
    type: String,
    trim: true,
    maxlength: 255,
    default: null,
  },

  mime_type: {
    type: String,
    trim: true,
    default: null,
  },

  metadata: {
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    duration: { type: Number, min: 0 },
    size: { type: Number, min: 0 },
  },
};

const PostAttachment = createBaseModel('PostAttachment', postAttachmentDefinition, (schema) => {
  schema.index({ post_id: 1 });
  schema.index({ post_id: 1, type: 1, created_at: 1 });
  schema.index({ user_id: 1, type: 1, created_at: -1 });
  schema.index({ user_id: 1, status: 1, created_at: -1 });
});

export { PostAttachment };
export default PostAttachment;