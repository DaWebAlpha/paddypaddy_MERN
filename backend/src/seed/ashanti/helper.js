import mongoose from 'mongoose';
import connectDB from '../../core/mongoose.database.js';
import { system_logger } from '../../core/pino.logger.js';
import Country from "../../models/location/country.model.js";
import Region from "../../models/location/region.model.js";
import District from "../../models/location/district.model.js";
import Town from "../../models/location/town.model.js";


async function seedTowns(towns_raw_data, country_slug, region_slug, town_slug){
    await connectDB();

    const country = await Country.findOne({ slug: `${country_slug}`}).lean();
    const region = await Region.findOne({ slug: `${region_slug}` }).lean();
    const district = await District.findOne({slug: `${town_slug}`}).lean();

    if (!country || !region) {
        system_logger.error("Country or Region not found. Seeding aborted.");
        process.exit(1);
    }

    if(!district){
        system_logger.error("District not found. Seeding aborted");
        process.exit(1);
    }




const town_district = towns_raw_data.map(item => ({
    ...item,
    region_id: region._id,
    country_id: country._id,
    district_id: district._id, 
    
}))


const seed_town = async function(){
    try{
        await Town.insertMany(town_district);
            system_logger.info("Database has been seeded successfully");
            process.exit(0);
        } catch (error) {
            system_logger.error({ err: error }, "Error seeding data");
            process.exit(1);
        }
}

    seed_town();
}


export { seedTowns };
export default seedTowns;