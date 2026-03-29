import mongoose from 'mongoose';
import createBaseModel from '../mongoose.base.model.js';
import { formatTitle, getUpdateData, RESERVED_WORDS } from '../utils/string.js';

const NAME_REGEX = /^[a-zA-Z](?:[\s._`'\-][a-zA-Z])*$/;

const customerProfileDefinition = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  first_name: {
    type: String,
    trim: true,
    required: [true, 'Firstname is required'],
    minlength: [2, 'Firstname is too short'],
    maxlength: [30, 'Firstname is too long'],
    match: [NAME_REGEX, 'Firstname must start/end with a letter and only contain valid characters'],
    validate: {
      validator: (val) => !RESERVED_WORDS.has(String(val || '').trim().toLowerCase()),
      message: (props) => `${props.value} is a reserved word`,
    },
  },

  last_name: {
    type: String,
    trim: true,
    required: [true, 'Lastname is required'],
    minlength: [2, 'Lastname is too short'],
    maxlength: [20, 'Lastname is too long'],
    match: [NAME_REGEX, 'Lastname must start/end with a letter and only contain valid characters'],
    validate: {
      validator: (val) => !RESERVED_WORDS.has(String(val || '').trim().toLowerCase()),
      message: (props) => `${props.value} is a reserved word`,
    },
  },

  full_name: {
    type: String,
    trim: true,
    required: true,
  },

  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
    index: true,
  },

  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
    index: true,
  },

  // Changed from constituency_id to district_id
  district_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true, 'District is required'],
    index: true,
  },

  town_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Town',
    required: true,
    index: true,
  },

  phone_number: {
    type: String,
    trim: true,
    default: null,
  },

  whatsapp_number: {
    type: String,
    trim: true,
    default: null,
  },

  bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: null,
  },

  profile_image: {
    type: String,
    default: null,
  },

  cover_image: {
    type: String,
    default: null,
  },

  is_active: {
    type: Boolean,
    default: true,
    index: true,
  },
};

const CustomerProfile = createBaseModel('CustomerProfile', customerProfileDefinition, (schema) => {
  schema.index(
    { user_id: 1 },
    { unique: true, partialFilterExpression: { is_deleted: false } }
  );

  schema.index({ town_id: 1, is_active: 1 });
  // Updated index to include region and district
  schema.index({ region_id: 1, district_id: 1, town_id: 1 });

  const formatProfile = (doc) => {
    if (doc.first_name) doc.first_name = formatTitle(doc.first_name);
    if (doc.last_name) doc.last_name = formatTitle(doc.last_name);

    if (doc.first_name && doc.last_name) {
      doc.full_name = `${doc.first_name} ${doc.last_name}`;
    }
  };

  schema.pre('validate', function (next) {
    formatProfile(this);
    next();
  });

  schema.pre('findOneAndUpdate', async function (next) {
    const { update, data } = getUpdateData(this.getUpdate());

    const currentDoc = await this.model
      .findOne(this.getQuery())
      .select('first_name last_name');

    if (data.first_name) data.first_name = formatTitle(data.first_name);
    if (data.last_name) data.last_name = formatTitle(data.last_name);

    const firstName = data.first_name ?? currentDoc?.first_name;
    const lastName = data.last_name ?? currentDoc?.last_name;

    if (firstName && lastName) {
      data.full_name = `${formatTitle(firstName)} ${formatTitle(lastName)}`;
    }

    if (update.$set) update.$set = data;
    else Object.assign(update, data);

    next();
  });
});

export { CustomerProfile };
export default CustomerProfile;
