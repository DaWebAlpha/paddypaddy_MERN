export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /* -------------------------------------------------------------------------- */
  /* CREATE */
  /* -------------------------------------------------------------------------- */

  async create(payload, options = {}) {
    const docs = await this.model.create([payload], options);
    return docs[0];
  }

  async insertMany(data, options = {}) {
    return this.model.insertMany(data, options);
  }

  /* -------------------------------------------------------------------------- */
  /* READ */
  /* -------------------------------------------------------------------------- */

  async find(filter = {}, projection = {}, options = {}) {
    let query = this.model.find(filter, projection, options);
    if (options.session) query = query.session(options.session);
    return query;
  }

  async findOne(filter = {}, projection = {}, options = {}) {
    let query = this.model.findOne(filter, projection, options);
    if (options.session) query = query.session(options.session);
    return query;
  }

  async findById(id, projection = {}, options = {}) {
    let query = this.model.findById(id, projection, options);
    if (options.session) query = query.session(options.session);
    return query;
  }

  async exists(filter = {}, options = {}) {
    let query = this.model.exists(filter);
    if (options.session) query = query.session(options.session);
    return query;
  }

  async countDocuments(filter = {}, options = {}) {
    let query = this.model.countDocuments(filter);
    if (options.session) query = query.session(options.session);
    return query;
  }

  /* -------------------------------------------------------------------------- */
  /* UPDATE */
  /* -------------------------------------------------------------------------- */

  async findByIdAndUpdate(id, update = {}, options = {}) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async findOneAndUpdate(filter = {}, update = {}, options = {}) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async updateMany(filter = {}, update = {}, options = {}) {
    return this.model.updateMany(filter, update, options);
  }

  /* -------------------------------------------------------------------------- */
  /* DELETE */
  /* -------------------------------------------------------------------------- */

  async deleteOne(filter = {}, options = {}) {
    return this.model.deleteOne(filter, options);
  }

  async deleteMany(filter = {}, options = {}) {
    return this.model.deleteMany(filter, options);
  }

  /* -------------------------------------------------------------------------- */
  /* AGGREGATE */
  /* -------------------------------------------------------------------------- */

  async aggregate(pipeline = [], options = {}) {
    const agg = this.model.aggregate(pipeline);
    if (options.session) agg.session(options.session);
    return agg.exec();
  }

  /* -------------------------------------------------------------------------- */
  /* BULK */
  /* -------------------------------------------------------------------------- */

  async bulkWrite(operations = [], options = {}) {
    return this.model.bulkWrite(operations, options);
  }

  /* -------------------------------------------------------------------------- */
  /* DOCUMENT */
  /* -------------------------------------------------------------------------- */

  async save(document, options = {}) {
    return document.save(options);
  }

  /* -------------------------------------------------------------------------- */
  /* PAGINATION */
  /* -------------------------------------------------------------------------- */

  async paginate(filter = {}, page = 1, limit = 20, projection = {}, options = {}) {
    return this.model.paginate(filter, page, limit, projection, options);
  }

  /* -------------------------------------------------------------------------- */
  /* SOFT DELETE / DOMAIN METHODS */
  /* -------------------------------------------------------------------------- */

  async softDeleteById(id, userId = null, options = {}) {
    const doc = await this.findOne({ _id: id, is_deleted: false }, {}, options);
    if (!doc) return null;
    return doc.softDelete(userId, options);
  }

  async restoreSoftDeletedById(id, userId = null, options = {}) {
    const doc = await this.findOne({ _id: id, is_deleted: true }, {}, options);
    if (!doc) return null;
    return doc.restore(userId, options);
  }

  async suspendUserAccount(id, durationMs = null, userId = null, options = {}) {
    const doc = await this.findOne({ _id: id, is_deleted: false }, {}, options);
    if (!doc) return null;
    return doc.suspendAccount(durationMs, userId, options);
  }
}