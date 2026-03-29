import createBaseModel from '../mongoose.base.model.js';
import { formatName, formatSlug, cleanName, getUpdateData, hasOwn } from '../../utils/string.utils.js';

const countrySchemaDefinition = {
  country: {
    type: String,
    trim: true,
    required: [true, 'Country is required'],
    minlength: [2, 'Country name is too short'],
    maxlength: [120, 'Country name is too long'],
  },

  iso_code: {
    type: String,
    trim: true,
    required: [true, 'ISO code is required'],
    minlength: [2, 'ISO code is too short'],
    maxlength: [3, 'ISO code is too long'],
  },

  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },

  country_flag: {
    type: String,
    trim: true,
    default: '',
  },
};

const Country = createBaseModel('Country', countrySchemaDefinition, (schema) => {
  schema.index(
    { country: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index(
    { iso_code: 1 },
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

  schema.pre('validate', function () {
    if (this.country) {
      this.country = formatName(this.country);
      this.slug = formatSlug(this.country);
    }

    if (this.iso_code) {
      this.iso_code = cleanName(this.iso_code).toUpperCase();
    }

    if (this.country_flag) {
      this.country_flag = cleanName(this.country_flag);
    }

  });

  schema.pre('findOneAndUpdate', function () {
    const { update, data } = getUpdateData(this.getUpdate());

    if (data.country) {
      data.country = formatName(data.country);
      data.slug = formatSlug(data.country);
    }

    if (data.iso_code) {
      data.iso_code = cleanName(data.iso_code).toUpperCase();
    }

    if (hasOwn(data, 'slug') && !data.country) {
      data.slug = data.slug ? formatSlug(data.slug) : '';
    }

    if (hasOwn(data, 'country_flag')) {
      data.country_flag = data.country_flag ? cleanName(data.country_flag) : '';
    }

    if (update.$set) update.$set = data;
    else Object.assign(update, data);

  
  });
});

export { Country };
export default Country;