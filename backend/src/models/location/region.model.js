import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const regionDefinition = {
  region: {
    type: String,
    trim: true,
    required: [true, 'Region is required'],
    minlength: [2, 'Region name is too short'],
    maxlength: [120, 'Region name is too long'],
  },

  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },

  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Country is required'],
    index: true,
  },
};

const Region = createBaseModel('Region', regionDefinition, (schema) => {
  schema.index(
    { region: 1, country_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { slug: 1, country_id: 1 },
    {
      unique: true,
      partialFilterExpression: {
        is_deleted: false,
        slug: { $exists: true, $type: 'string', $ne: '' },
      },
    }
  );

  schema.index({ country_id: 1, region: 1 });

  schema.pre('validate', function () {
    if (this.region) {
      this.region = formatName(this.region);
      this.slug = formatSlug(this.region);
    } else if (this.slug) {
      this.slug = formatSlug(this.slug);
    }
  });

  schema.pre('findOneAndUpdate', function () {
    const { update, data } = getUpdateData(this.getUpdate());

    if (data.region) {
      data.region = formatName(data.region);
      data.slug = formatSlug(data.region);
    }

    if (hasOwn(data, 'slug') && !data.region) {
      data.slug = data.slug ? formatSlug(data.slug) : '';
    }

    if (update.$set) update.$set = data;
    else Object.assign(update, data);

  });
});

export { Region };
export default Region;