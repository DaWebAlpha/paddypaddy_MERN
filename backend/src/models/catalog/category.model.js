import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const categorySchemaDefinition = {
  name: {
    type: String,
    trim: true,
    required: [true, 'Category is required'],
    minlength: [2, 'Category length is too small'],
    maxlength: [120, 'Category length is too long'],
  },

  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },

  display_order: {
    type: Number,
    default: 0,
  },
};

const Category = createBaseModel('Category', categorySchemaDefinition, (schema) => {
  schema.index(
    { name: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  // Create/Save: always sync slug from name
  schema.pre('validate', function (next) {
    if (this.name) {
      this.name = formatName(this.name);
      this.slug = formatSlug(this.name);
    } else if (this.slug) {
      this.slug = formatSlug(this.slug);
    }
    next();
  });

  // Update: if name changes -> regenerate slug
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

export { Category };
export default Category;