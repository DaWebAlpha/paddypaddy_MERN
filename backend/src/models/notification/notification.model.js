import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const notificationDefinition = {
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  actor_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  type: {
    type: String,
    enum: ['message','post_comment','post_reaction','promotion_submitted','promotion_approved','promotion_rejected','payment_received','system'],
    required: true,
    index: true,
  },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  body: { type: String, trim: true, maxlength: 1000, default: '' },
  entity_type: { type: String, trim: true, default: null, maxlength: 80 },
  entity_id: { type: String, trim: true, default: null, maxlength: 120 },
  is_read: { type: Boolean, default: false, index: true },
  read_at: { type: Date, default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
};

const Notification = createBaseModel('Notification', notificationDefinition, (schema) => {
  schema.index({ user_id: 1, is_read: 1, created_at: -1 });
  schema.index({ user_id: 1, created_at: -1 });
});

export default Notification;
