import mongoose from 'mongoose';
import connectDB from "../../core/mongoose.database.js";
import Constituency from "../../models/location/district.model.js";
import Country from "../../models/location/country.model.js";
import Region from "../../models/location/region.model.js";
import { system_logger } from "../../core/pino.logger.js";

await connectDB();

const country = await Country.findOne({ slug: "ghana" }).lean();
const ashanti = await Region.findOne({ slug: "ashanti" }).lean();

if (!country || !ashanti) {
    system_logger.error("Country or Region not found. Seeding aborted.");
    process.exit(1);
}

const raw_ashanti_data = [
 /*  { constituency: "Sekyere Afram Plains"}, */
 {constituency: "oforikrom"}
  
];

// Add the IDs to every object automatically
const ashanti_region = raw_ashanti_data.map(item => ({
    ...item,
    region_id: ashanti._id,
    country_id: country._id
}));

const seed_constituencies = async function() {
    try {
        await Constituency.insertMany(ashanti_region);
        system_logger.info("Database has been seeded successfully");
        process.exit(0);
    } catch (error) {
        system_logger.error({ err: error }, "Error seeding data");
        process.exit(1);
    }
}

seed_constituencies();
