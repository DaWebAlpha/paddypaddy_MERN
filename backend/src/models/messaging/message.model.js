import mongoose from 'mongoose';
import createBaseModel from "../mongoose.base.model.js";

const messageDefinition = {
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true,
  },

  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  body: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: null,
  },

  read_at: {
    type: Date,
    default: null,
    index: true,
  },

  deleted_for: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
};

const Message = createBaseModel('Message', messageDefinition, (schema) => {
  schema.index({ conversation_id: 1, created_at: -1 });
  schema.index({ receiver_id: 1, read_at: 1 });
  schema.index({ deleted_for: 1 });

  // Optional: test this if needed for filtering performance
  // schema.index({ conversation_id: 1, deleted_for: 1, created_at: -1 });
});

export { Message };
export default Message;