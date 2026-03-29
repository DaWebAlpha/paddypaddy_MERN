import mongoose from 'mongoose';
import connectDB from '../core/mongoose.database.js';
import { system_logger } from '../core/pino.logger.js';
import Country from "../models/location/country.model.js";
import Region from "../models/location/region.model.js";

await connectDB();
const ghana = await Country.findOne({ slug: "ghana" }).lean();

const regions = [
  { region: "Greater Accra", slug: "greater-accra", country_id: ghana._id },
  { region: "Ashanti", slug: "ashanti", country_id: ghana._id },
  { region: "Western", slug: "western", country_id: ghana._id },
  { region: "Western North", slug: "western-north", country_id: ghana._id },
  { region: "Central", slug: "central", country_id: ghana._id },
  { region: "Eastern", slug: "eastern", country_id: ghana._id },
  { region: "Volta", slug: "volta", country_id: ghana._id },
  { region: "Oti", slug: "oti", country_id: ghana._id },
  { region: "Northern", slug: "northern", country_id: ghana._id },
  { region: "Savannah", slug: "savannah", country_id: ghana._id },
  { region: "North East", slug: "north-east", country_id: ghana._id },
  { region: "Upper East", slug: "upper-east", country_id: ghana._id },
  { region: "Upper West", slug: "upper-west", country_id: ghana._id },
  { region: "Bono", slug: "bono", country_id: ghana._id },
  { region: "Bono East", slug: "bono-east", country_id: ghana._id },
  { region: "Ahafo", slug: "ahafo", country_id: ghana._id }
];


const seedRegions = async function(){
    try{
        

        await Region.insertMany(regions);
        system_logger.info("Regions have been seeded");
        process.exit(0)

    }catch(error){
        system_logger.info({err: error}, "Error seeding regions");
        process.exit(1);
    }
}

seedRegions();