import mongoose from 'mongoose';
import { stringHelpers } from "../../utils/string.utils.js"
import { hashPassword, verifyPassword } from "../../utils/bcrypt.password.js";
import validator from 'validator';



const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,120}$/;
const USERNAME_REGEX = /^(?=.{3,20}$)([A-Za-z0-9])+(?:[._-][A-Za-z0-9]+)*$/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Username is required"],
        minlength: [3, "Username is too short"],
        maxlength: [20, "Username is too long"],
        match:[
            USERNAME_REGEX,
            "Username must be 3–20 characters long, start/end with a letter or number, and can only contain single underscores, dots, or hyphens in between."
        ]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        minlength: [5, "Email is too short"],
        maxlength: [120, "Email is too long"],
        validate: {
            validator: function(val){
                return validator.isEmail(val)
            },
            message: "Enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "Password is too short"],
        maxlength: [120, "Password is too long"],
        select: false,
        match:[
            PASSWORD_REGEX,
            "Password must be atleast 8 charcters long and must contain an Uppercase, Lowercase, number and a special character"
        ]
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',

    }
})

userSchema.index({email: 1},{unique: true});
userSchema.index({username: 1}, {unique: true});
userSchema.index({email: 1, role: 1});
userSchema.index({username: 1, role: 1})

userSchema.pre('save', async function() {
    // If password hasn't changed, just return (resolves the promise)
    if (!this.isModified('password')) return;

    // Hashing the password; any error thrown here 
    // will automatically be caught by Mongoose
    this.password = await hashPassword(this.password);
});

userSchema.methods.comparePassword = async function (plainPassword){
    return await verifyPassword(plainPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export { User };
export default User;