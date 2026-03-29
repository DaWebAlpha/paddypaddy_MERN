import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const workCategorySchemaDefinition = {
  name: {
    type: String,
    trim: true,
    required: [true, 'Category of work is required'],
    minlength: [3, 'Name is too small'],
    maxlength: [120, 'Name is too long'],
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
};

const WorkCategory = createBaseModel('WorkCategory', workCategorySchemaDefinition, (schema) => {
  schema.index(
    { name: 1, category_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1, category_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  schema.index({ category_id: 1, name: 1 });

  schema.pre('validate', function (next) {
    if (this.name) {
      this.name = formatName(this.name);
      this.slug = formatSlug(this.name);
    }
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const { update, data } = getUpdateData(this.getUpdate());

    if (data.name) {
      data.name = formatName(data.name);
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


export { WorkCategory }
export default WorkCategory;