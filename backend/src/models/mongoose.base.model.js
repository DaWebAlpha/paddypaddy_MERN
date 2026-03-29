import mongoose from 'mongoose';
import baseOptions from './base.options.js';

const baseFields = {
  is_deleted: {
    type: Boolean,
    default: false,
    index: true
  },
  deleted_at: {
    type: Date,
    default: null
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  deleted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
};

export default function createBaseModel(name, schemaDefinition, configCallback) {
  const schema = new mongoose.Schema(
    {
      ...schemaDefinition,
      ...baseFields
    },
    baseOptions
  );

  schema.pre(/^find/, function () {
    if (!Object.prototype.hasOwnProperty.call(this.getFilter(), 'is_deleted')) {
      this.where({ is_deleted: false });
    }
  });

  schema.methods.softDelete = async function (userId = null) {
    this.is_deleted = true;
    this.deleted_at = new Date();
    this.deleted_by = userId;
    this.updated_by = userId;
    return this.save();
  };

  schema.methods.restore = async function (userId = null) {
    this.is_deleted = false;
    this.deleted_at = null;
    this.deleted_by = null;
    this.updated_by = userId;
    return this.save();
  };

  schema.methods.hardDelete = async function () {
    return this.deleteOne();
  };

  schema.statics.paginate = async function (
    filter = {},
    page = 1,
    limit = 20,
    projection = {},
    options = {}
  ) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || 20);
    const skip = (safePage - 1) * safeLimit;

    const finalFilter = Object.prototype.hasOwnProperty.call(filter, 'is_deleted')
      ? filter
      : { ...filter, is_deleted: false };

    let query = this.find(
      finalFilter,
      projection,
      { sort: options.sort || {} }
    )
      .skip(skip)
      .limit(safeLimit);

    if (options.populate) {
      if (Array.isArray(options.populate)) {
        for (const item of options.populate) {
          query = query.populate(item);
        }
      } else {
        query = query.populate(options.populate);
      }
    }

    if (options.lean !== false) {
      query = query.lean();
    }

    const [data, total] = await Promise.all([
      query,
      this.countDocuments(finalFilter)
    ]);

    return {
      data,
      page: safePage,
      limit: safeLimit,
      total,
      total_pages: Math.ceil(total / safeLimit)
    };
  };

  if (configCallback && typeof configCallback === 'function') {
    configCallback(schema);
  }

  return mongoose.model(name, schema);
}