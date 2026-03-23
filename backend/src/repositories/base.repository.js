export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /* -------------------------------------------------------------------------- */
  /* INTERNAL HELPERS */
  /* -------------------------------------------------------------------------- */

  _extractQueryOptions(options = {}) {
    const { session, sort, skip, limit, collation, hint } = options;
    const queryOptions = {};

    if (session) queryOptions.session = session;
    if (sort) queryOptions.sort = sort;
    if (skip !== undefined) queryOptions.skip = skip;
    if (limit !== undefined) queryOptions.limit = limit;
    if (collation) queryOptions.collation = collation;
    if (hint) queryOptions.hint = hint;

    return queryOptions;
  }

  _applyModifiers(query, options = {}) {
    if (options.session) query.session(options.session);
    if (options.populate) query.populate(options.populate);
    if (options.lean) query.lean();
    return query;
  }

  /* -------------------------------------------------------------------------- */
  /* CREATE */
  /* -------------------------------------------------------------------------- */

  async create(payload, options = {}) {
    const [doc] = await this.model.create([payload], options);
    return doc;
  }

  async insertMany(data, options = {}) {
    return this.model.insertMany(data, options);
  }

  /* -------------------------------------------------------------------------- */
  /* READ */
  /* -------------------------------------------------------------------------- */

  find(filter = {}, projection = {}, options = {}) {
    const query = this.model.find(
      filter,
      projection,
      this._extractQueryOptions(options)
    );
    return this._applyModifiers(query, options);
  }

  findOne(filter = {}, projection = {}, options = {}) {
    const query = this.model.findOne(
      filter,
      projection,
      this._extractQueryOptions(options)
    );
    return this._applyModifiers(query, options);
  }

  findById(id, projection = {}, options = {}) {
    const query = this.model.findById(
      id,
      projection,
      this._extractQueryOptions(options)
    );
    return this._applyModifiers(query, options);
  }

  exists(filter = {}, options = {}) {
    const query = this.model.exists(filter);
    if (options.session) query.session(options.session);
    return query;
  }

  countDocuments(filter = {}, options = {}) {
    const query = this.model.countDocuments(filter);
    if (options.session) query.session(options.session);
    return query;
  }

  /* -------------------------------------------------------------------------- */
  /* UPDATE */
  /* -------------------------------------------------------------------------- */

  findByIdAndUpdate(id, update = {}, options = {}) {
    const config = {
      new: true,
      ...this._extractQueryOptions(options),
    };

    const query = this.model.findByIdAndUpdate(id, update, config);
    return this._applyModifiers(query, options);
  }

  findOneAndUpdate(filter = {}, update = {}, options = {}) {
    const config = {
      new: true,
      ...this._extractQueryOptions(options),
    };

    const query = this.model.findOneAndUpdate(filter, update, config);
    return this._applyModifiers(query, options);
  }

  updateMany(filter = {}, update = {}, options = {}) {
    return this.model.updateMany(
      filter,
      update,
      this._extractQueryOptions(options)
    );
  }

  /* -------------------------------------------------------------------------- */
  /* DELETE */
  /* -------------------------------------------------------------------------- */

  deleteOne(filter = {}, options = {}) {
    return this.model.deleteOne(
      filter,
      this._extractQueryOptions(options)
    );
  }

  deleteMany(filter = {}, options = {}) {
    return this.model.deleteMany(
      filter,
      this._extractQueryOptions(options)
    );
  }

  /* -------------------------------------------------------------------------- */
  /* AGGREGATE / BULK */
  /* -------------------------------------------------------------------------- */

  async aggregate(pipeline = [], options = {}) {
    const agg = this.model.aggregate(pipeline);
    if (options.session) agg.session(options.session);
    return agg.exec();
  }

  bulkWrite(operations = [], options = {}) {
    return this.model.bulkWrite(operations, options);
  }

  /* -------------------------------------------------------------------------- */
  /* DOCUMENT */
  /* -------------------------------------------------------------------------- */

  save(document, options = {}) {
    return document.save(options);
  }

  /* -------------------------------------------------------------------------- */
  /* PAGINATION */
  /* -------------------------------------------------------------------------- */

  paginate(filter = {}, page = 1, limit = 20, projection = {}, options = {}) {
    return this.model.paginate(filter, {
      page,
      limit,
      select: projection,
      ...options,
    });
  }

  /* -------------------------------------------------------------------------- */
  /* DOMAIN LOGIC (SOFT DELETE / RESTORE / SUSPEND) */
  /* -------------------------------------------------------------------------- */

  async softDeleteById(id, userId = null, options = {}) {
    const doc = await this.findOne(
      { _id: id, is_deleted: false },
      {},
      { ...options, lean: false }
    );

    return doc ? doc.softDelete(userId, options) : null;
  }

  async restoreSoftDeletedById(id, userId = null, options = {}) {
    const doc = await this.findOne(
      { _id: id, is_deleted: true },
      {},
      { ...options, lean: false }
    );

    return doc ? doc.restore(userId, options) : null;
  }

  async suspendUserAccount(id, durationMs = null, userId = null, options = {}) {
    const doc = await this.findOne(
      { _id: id, is_deleted: false },
      {},
      { ...options, lean: false }
    );

    return doc ? doc.suspendAccount(durationMs, userId, options) : null;
  }
}