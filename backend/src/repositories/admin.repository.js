import BaseRepository from "./base.repository.js";
import User from '../models/auth/user.model.js';


class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }


    normalize(value){
        return String(value || '').trim().toLowerCase();
    }


    async findAllSoftDeleted(){
        return this.find({
            is_deleted: true,
        })
    }

    async findByStatus(status){
        return this.find({
            account_status: this.normalize(status),
            is_deleted: false
        })
    }

    async userWithAccountBanned(){
        return this.find({
            account_banned: true,
            is_deleted: false
        })
    }

    async banUser(userId) {
        return this.updateById(userId, { account_banned: true });
    }

    async checkLoginLogsByRole(userRole){
        return this.find({
            role: this.normalize(userRole),
            is_deleted: false
        })
    }
}