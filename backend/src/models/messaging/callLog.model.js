import mongoose from 'mongoose';
import createBaseModel from "../mongoose.base.model.js";

const callLogDefinition = {
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true,
  },

  caller_id: {
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

  type: {
    type: String,
    enum: ['voice', 'video'],
    required: true,
  },

  status: {
    type: String,
    enum: ['missed', 'answered', 'rejected', 'failed'],
    required: true,
  },

  duration: {
    type: Number,
    default: 0,
    min: 0,
  },

  started_at: {
    type: Date,
    default: Date.now,
  },

  ended_at: {
    type: Date,
    default: null,
  },
};

const CallLog = createBaseModel('CallLog', callLogDefinition, (schema) => {
  schema.index({ conversation_id: 1, started_at: -1 });
  schema.index({ caller_id: 1, started_at: -1 });
  schema.index({ receiver_id: 1, started_at: -1 });
});

export { CallLog };
export default CallLog;