import mongoose from 'mongoose';
import config from '../config/config.js';
import { AppError } from "../errors/app.error.js";

const MONGO_URI = config.mongo_uri;


const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);

        console.log("Mongoose has been connected");
    }catch(error){
        throw new AppError(`Database Connection Error: ${error.message}`, 500);
    }
}

export { connectDB };
export default connectDB;