import mongoose from 'mongoose';
import createBaseModel from "../mongoose.base.model.js";

const conversationDefinition = {
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  ],

  participant_key: {
    type: String,
    trim: true,
    unique: true,
    index: true,
  },

  type: {
    type: String,
    enum: ['direct'],
    default: 'direct',
    index: true,
  },

  last_message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },

  last_message_at: {
    type: Date,
    default: null,
    index: true,
  },
};

const Conversation = createBaseModel('Conversation', conversationDefinition, (schema) => {
  schema.index({ participants: 1, last_message_at: -1 });
  schema.index({ participant_key: 1 }, { unique: true });

  schema.path('participants').validate(function (value) {
    if (!Array.isArray(value) || value.length !== 2) return false;

    const ids = value.map(String);
    return ids[0] !== ids[1];
  }, 'Direct conversation must have exactly 2 different participants');

  schema.pre('validate', function (next) {
    if (Array.isArray(this.participants) && this.participants.length === 2) {
      const sortedIds = this.participants.map(String).sort();
      this.participant_key = `${sortedIds[0]}:${sortedIds[1]}`;
    }
    next();
  });
});

export { Conversation };
export default Conversation;