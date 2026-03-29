import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { cleanName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const serviceSchemaDefinition = {
  name: {
    type: String,
    trim: true,
    required: [true, 'Service is required'],
    minlength: [3, 'Service name is too small'],
    maxlength: [120, 'Service name is too long'],
  },

  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },

  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category id is required'],
    index: true,
  },

  work_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkCategory',
    required: [true, 'Work category id is required'],
    index: true,
  },
};

const Service = createBaseModel('Service', serviceSchemaDefinition, (schema) => {
  schema.index(
    { name: 1, category_id: 1, work_category_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1, category_id: 1, work_category_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  schema.index({ category_id: 1, work_category_id: 1, name: 1 });

  schema.pre('validate', function (next) {
    if (this.name) {
      this.name = cleanName(this.name);
      this.slug = formatSlug(this.name);
    } else if (this.slug) {
      this.slug = formatSlug(this.slug);
    }
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const { update, data } = getUpdateData(this.getUpdate());

    if (data.name) {
      data.name = cleanName(data.name);
      data.slug = formatSlug(data.name);
    }

    if (hasOwn(data, 'slug') && !data.name) {
      data.slug = data.slug ? formatSlug(data.slug) : '';
    }

    if (update.$set) update.$set = data;
    else Object.assign(update, data);

    next();
  });
});

export { Service };
export default Service;