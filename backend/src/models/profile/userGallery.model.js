import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';

const GALLERY_MEDIA_TYPES = ['image', 'video'];

const userGalleryDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  provider_profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProviderProfile',
    required: true,
    index: true,
  },

  media_type: {
    type: String,
    enum: GALLERY_MEDIA_TYPES,
    default: 'image',
    index: true,
  },

  file_url: {
    type: String,
    trim: true,
    required: true,
  },

  thumbnail_url: {
    type: String,
    trim: true,
    default: null,
  },

  public_id: {
    type: String,
    trim: true,
    default: null,
    index: true,
  },

  caption: {
    type: String,
    trim: true,
    maxlength: 500,
    default: null,
  },

  alt_text: {
    type: String,
    trim: true,
    maxlength: 200,
    default: null,
  },

  display_order: {
    type: Number,
    default: 0,
    index: true,
  },

  is_featured: {
    type: Boolean,
    default: false,
    index: true,
  },

  is_active: {
    type: Boolean,
    default: true,
    index: true,
  },

  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
};

const UserGallery = createBaseModel('UserGallery', userGalleryDefinition, (schema) => {
  schema.index({ provider_profile_id: 1, is_active: 1, display_order: 1, created_at: -1 });
  schema.index({ user_id: 1, created_at: -1 });

  schema.pre('validate', function (next) {
    if (this.caption === '') this.caption = null;
    if (this.alt_text === '') this.alt_text = null;
    if (this.thumbnail_url === '') this.thumbnail_url = null;
    if (this.public_id === '') this.public_id = null;
    next();
  });
});

export { UserGallery };
export default UserGallery;