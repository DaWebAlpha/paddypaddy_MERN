import mongoose from 'mongoose';
import connectDB from '../core/mongoose.database.js';
import { system_logger } from '../core/pino.logger.js';
import Country from "../models/location/country.model.js";

const seedRegion = async function(){
    try{
        
        await connectDB();
        
        await Country.create({
            country: "GhaNa",
            iso_code: "GHa",
        })
        system_logger.info("Country has been seeded");
        process.exit(0);
    }catch(error){
        system_logger.error(error, "Error seeding country");
        process.exit(1);
    }
}

seedRegion();