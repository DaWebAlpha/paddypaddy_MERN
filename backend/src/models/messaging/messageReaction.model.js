import mongoose from 'mongoose';
import createBaseModel from "../mongoose.base.model.js";

const messageReactionDefinition = {
  message_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: true,
    index: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  type: {
    type: String,
    enum: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'],
    required: true,
  }
};

const MessageReaction = createBaseModel('MessageReaction', messageReactionDefinition, (schema) => {
  schema.index({ message_id: 1, user_id: 1 }, { unique: true });
});

export { MessageReaction };
export default MessageReaction;