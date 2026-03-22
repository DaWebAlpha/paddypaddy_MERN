import BaseRepository from "./base.repository.js";
import User from "../models/auth/user.model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.findOne({
      email: String(email || '').trim().toLowerCase(),
      is_deleted: false,
    });
  }

  async findByEmailWithPassword(email) {
    return this.findOne({
      email: String(email || '').trim().toLowerCase(),
      is_deleted: false,
    }).select('+password');
  }

  async findByUsername(username) {
    return this.findOne({
      username: String(username || '').trim().toLowerCase(),
      is_deleted: false,
    });
  }

  async existsByEmail(email) {
    const user = await this.exists({
      email: String(email || '').trim().toLowerCase(),
      is_deleted: false,
    });

    return !!user;
  }

  async existsByUsername(username) {
    const user = await this.exists({
      username: String(username || '').trim().toLowerCase(),
      is_deleted: false,
    });

    return !!user;
  }

  async findByGoogleSub(google_sub) {
    return this.findOne({
      google_sub: String(google_sub || '').trim(),
      is_deleted: false,
    });
  }

  async findActiveById(id) {
    return this.findOne({
      _id: id,
      is_deleted: false,
    });
  }
}

const userRepository = new UserRepository();
export default userRepository;
export { userRepository };