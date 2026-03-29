import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const townSchemaDefinition = {
  town: {
    type: String,
    trim: true,
    required: [true, 'Town name is required'],
    minlength: [2, 'Town name is too short'],
    maxlength: [120, 'Town name is too long'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Country ID is required'],
    index: true,
  },
  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: [true, 'Region ID is required'],
    index: true,
  },
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true, 'District ID is required'],
    index: true,
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
};

const Town = createBaseModel('Town', townSchemaDefinition, (schema) => {
  schema.index(
    { town: 1, district_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1, district_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  schema.pre('validate', function () {
    if (this.town) {
      this.town = formatName(this.town);
      this.slug = formatSlug(this.town);
    }
  });

  schema.pre('findOneAndUpdate', function () {
    const { update, data } = getUpdateData(this.getUpdate());
    if (data.town) {
      data.town = formatName(data.town);
      data.slug = formatSlug(data.town);
    } else if (hasOwn(data, 'slug')) {
      data.slug = data.slug ? formatSlug(data.slug) : '';
    }
    if (update.$set) update.$set = { ...update.$set, ...data };
    else Object.assign(update, data);
  });
});

export { Town };
export default Town;
