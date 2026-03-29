import BaseRepository from "./base.repository.js";
import User from "../models/auth/user.model.js";
import normalizeName from "../utils/string.utils.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  

  async findAllSoftDeleted(options = {}) {
    return this.find(
      {
        is_deleted: true,
      },
      {},
      options
    );
  }

  async findByStatus(status, options = {}) {
    return this.find(
      {
        account_status: this.normalizeName(status),
        is_deleted: false,
      },
      {},
      options
    );
  }

  async usersWithAccountBanned(options = {}) {
    return this.find(
      {
        account_banned: true,
        is_deleted: false,
      },
      {},
      options
    );
  }

  async banUser(userId, options = {}) {
    return this.findByIdAndUpdate(
      userId,
      { account_banned: true },
      { new: true, ...options }
    );
  }

  async checkLoginLogsByRole(userRole, options = {}) {
    return this.find(
      {
        role: this.normalizeName(userRole),
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