import BaseRepository from "./base.repository.js";
import User from "../models/auth/user.model.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email, options = {}) {
    return this.findOne(
      {
        email: String(email || "").trim().toLowerCase(),
        is_deleted: false,
      },
      {},
      options
    );
  }

  async findByEmailOrUsernameWithPassword(email, options = {}) {
    return this.model
      .findOne(
        {
          $or: [
            {email: String(email || "").trim().toLowerCase()},
            {username: String(username || "").trim().toLowerCase()}
          ],
            is_deleted: false,

        },
        {},
        options
      )
      .select("+password")
      .session(options.session || null);
  }

  async findByUsername(username, options = {}) {
    return this.findOne(
      {
        username: String(username || "").trim().toLowerCase(),
        is_deleted: false,
      },
      {},
      options
    );
  }

  async existsByEmail(email, options = {}) {
    const user = await this.exists(
      {
        email: String(email || "").trim().toLowerCase(),
      },
      options
    );

    return !!user;
  }

  async existsByUsername(username, options = {}) {
    const user = await this.exists(
      {
        username: String(username || "").trim().toLowerCase(),
      },
      options
    );

    return !!user;
  }

  async findByGoogleSub(google_sub, options = {}) {
    return this.findOne(
      {
        google_sub: String(google_sub || "").trim(),
        is_deleted: false,
      },
      {},
      options
    );
  }

  async findActiveById(id, options = {}) {
    return this.findOne(
      {
        _id: id,
        is_deleted: false,
      },
      {},
      options
    );
  }
}

const userRepository = new UserRepository();
export default userRepository;
export { userRepository };