import mongoose from 'mongoose';
import createBaseModel from "../mongoose.base.model.js";

const messageAttachmentDefinition = {
  message_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: true,
    index: true,
  },

  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
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

const MessageAttachment = createBaseModel('MessageAttachment', messageAttachmentDefinition, (schema) => {
  schema.index({ message_id: 1 });

  
  schema.index({ conversation_id: 1, type: 1, created_at: -1 });
});

export { MessageAttachment };
export default MessageAttachment;