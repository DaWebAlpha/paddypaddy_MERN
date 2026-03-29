import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const districtSchemaDefinition = {
  district: {
    type: String,
    trim: true,
    required: [true, 'District name is required'],
    minlength: [2, 'District name is too short'],
    maxlength: [120, 'District name is too long'],
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
  is_deleted: {
    type: Boolean,
    default: false
  }
};

const District = createBaseModel('District', districtSchemaDefinition, (schema) => {
  schema.index(
    { district: 1, region_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1, region_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  schema.pre('validate', function () {
    if (this.district) {
      this.district = formatName(this.district);
      this.slug = formatSlug(this.district);
    }
  });

  schema.pre('findOneAndUpdate', function () {
    const { update, data } = getUpdateData(this.getUpdate());
    if (data.district) {
      data.district = formatName(data.district);
      data.slug = formatSlug(data.district);
    } else if (hasOwn(data, 'slug')) {
      data.slug = data.slug ? formatSlug(data.slug) : '';
    }
    if (update.$set) update.$set = { ...update.$set, ...data };
    else Object.assign(update, data);
  });
});

export { District };
export default District;
