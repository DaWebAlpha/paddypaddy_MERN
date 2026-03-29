import mongoose from 'mongoose';
import connectDB from "../../core/mongoose.database.js";
import Constituency from "../../models/location/constituency.model.js";
import Region from "../../models/location/region.model.js";
import {system_logger } from "../../core/pino.logger.js";

await connectDB();
const greaterAccra = await Region.findOne({slug: "greater-accra"}).lean();


const greater_accra_region = [
  { constituency: "Ablekuma Central", slug: "ablekuma-central", region_id: greaterAccra._id },
  { constituency: "Ablekuma North", slug: "ablekuma-north", region_id: greaterAccra._id },
  { constituency: "Ablekuma West", slug: "ablekuma-west", region_id: greaterAccra._id },
  { constituency: "Abokobi-Madina", slug: "abokobi-madina", region_id: greaterAccra._id },
  { constituency: "Adentan", slug: "adentan", region_id: greaterAccra._id },
  { constituency: "Ada", slug: "ada", region_id: greaterAccra._id },
  { constituency: "Ashaiman", slug: "ashaiman", region_id: greaterAccra._id },
  { constituency: "Ayawaso Central", slug: "ayawaso-central", region_id: greaterAccra._id },
  { constituency: "Ayawaso East", slug: "ayawaso-east", region_id: greaterAccra._id },
  { constituency: "Ayawaso North", slug: "ayawaso-north", region_id: greaterAccra._id },
  { constituency: "Ayawaso West Wuogon", slug: "ayawaso-west-wuogon", region_id: greaterAccra._id },
  { constituency: "Bortianor-Ngleshie-Amanfro", slug: "bortianor-ngleshie-amanfro", region_id: greaterAccra._id },
  { constituency: "Dome Kwabenya", slug: "dome-kwabenya", region_id: greaterAccra._id },
  { constituency: "Ga Central", slug: "ga-central", region_id: greaterAccra._id },
  { constituency: "Ga East", slug: "ga-east", region_id: greaterAccra._id },
  { constituency: "Ga North", slug: "ga-north", region_id: greaterAccra._id },
  { constituency: "Ga South", slug: "ga-south", region_id: greaterAccra._id },
  { constituency: "Ga West", slug: "ga-west", region_id: greaterAccra._id },
  { constituency: "Klottey Korle", slug: "klottey-korle", region_id: greaterAccra._id },
  { constituency: "Korle Klottey", slug: "korle-klottey", region_id: greaterAccra._id },
  { constituency: "Krowor", slug: "krowor", region_id: greaterAccra._id },
  { constituency: "La Dadekotopon", slug: "la-dadekotopon", region_id: greaterAccra._id },
  { constituency: "La Nkwantanang Madina", slug: "la-nkwantanang-madina", region_id: greaterAccra._id },
  { constituency: "Ledzokuku", slug: "ledzokuku", region_id: greaterAccra._id },
  { constituency: "Madina", slug: "madina", region_id: greaterAccra._id },
  { constituency: "Ningo Prampram", slug: "ningo-prampram", region_id: greaterAccra._id },
  { constituency: "Odododiodio", slug: "odododiodio", region_id: greaterAccra._id },
  { constituency: "Okaikwei Central", slug: "okaikwei-central", region_id: greaterAccra._id },
  { constituency: "Okaikwei North", slug: "okaikwei-north", region_id: greaterAccra._id },
  { constituency: "Sege", slug: "sege", region_id: greaterAccra._id },
  { constituency: "Shai Osudoku", slug: "shai-osudoku", region_id: greaterAccra._id },
  { constituency: "Tema Central", slug: "tema-central", region_id: greaterAccra._id },
  { constituency: "Tema East", slug: "tema-east", region_id: greaterAccra._id },
  { constituency: "Tema West", slug: "tema-west", region_id: greaterAccra._id }
];  


const seed_constituencies = async function(){
    try{
        
        await Constituency.insertMany(greater_accra_region);
        process.exit(0);
        system_logger.info("Database has been seeded");
    }catch(error){
        system_logger.error({err: error}, "Error seeding data");
    }
    process.exit(1);
}

seed_constituencies();