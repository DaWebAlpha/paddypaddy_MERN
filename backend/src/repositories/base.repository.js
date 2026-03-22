/*
|--------------------------------------------------------------------------
| BASE REPOSITORY
|--------------------------------------------------------------------------
|
| Generic repository wrapper for Mongoose models.
| Domain repositories extend this class to inherit common CRUD methods.
|
*/

export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async insertMany(data, options = {}) {
    return this.model.insertMany(data, options);
  }

  async find(filter = {}, projection = {}, options = {}) {
    return this.model.find(filter, projection, options);
  }

  async findOne(filter = {}, projection = {}, options = {}) {
    return this.model.findOne(filter, projection, options);
  }

  async findById(id, projection = {}, options = {}) {
    return this.model.findById(id, projection, options);
  }

  async exists(filter = {}) {
    return this.model.exists(filter);
  }

  async countDocuments(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async findByIdAndUpdate(id, update = {}, options = { new: true, runValidators: true }) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async findOneAndUpdate(filter = {}, update = {}, options = { new: true, runValidators: true }) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async updateMany(filter = {}, update = {}, options = {}) {
    return this.model.updateMany(filter, update, options);
  }

  async deleteOne(filter = {}, options = {}) {
    return this.model.deleteOne(filter, options);
  }

  async deleteMany(filter = {}, options = {}) {
    return this.model.deleteMany(filter, options);
  }

  async aggregate(pipeline = []) {
    return this.model.aggregate(pipeline);
  }

  async bulkWrite(operations = [], options = {}) {
    return this.model.bulkWrite(operations, options);
  }

  async save(document) {
    return document.save();
  }

  async paginate(filter = {}, page = 1, limit = 20, projection = {}, options = {}) {
    return this.model.paginate(filter, page, limit, projection, options);
  }

  async softDeleteById(id, userId = null) {
    const doc = await this.model.findOne({ _id: id, is_deleted: false });

    if (!doc) return null;

    return doc.softDelete(userId);
  }

  async restoreSoftDeletedById(id, userId = null) {
    const doc = await this.findOne({ _id: id, is_deleted: true });

    if (!doc) return null;

    return doc.restore(userId);
  }

  async suspendUserAccount(id, durationMs = null, userId = null) {
    const doc = await this.findOne({ _id: id, is_deleted: false });

    if (!doc) return null;

    return doc.suspendAccount(durationMs, userId);
  }
}