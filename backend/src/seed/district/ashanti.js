import mongoose from 'mongoose';
import connectDB from "../../core/mongoose.database.js";
import District from "../../models/location/district.model.js"; // Updated import
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
  { district: "Adansi Asokwa", slug: "adansi-asokwa" },
  { district: "Adansi Akrofuom", slug: "adansi-akrofuom" },
  { district: "Adansi Fomena", slug: "adansi-fomena" },
  { district: "Afigya Kwabre North", slug: "afigya-kwabre-north" },
  { district: "Afigya Kwabre South", slug: "afigya-kwabre-south" },
  { district: "Ahafo Ano North", slug: "ahafo-ano-north" },
  { district: "Ahafo Ano South East", slug: "ahafo-ano-south-east" },
  { district: "Ahafo Ano South West", slug: "ahafo-ano-south-west" },
  { district: "Akrofuom", slug: "akrofuom" },
  { district: "Asante Akim Central", slug: "asante-akim-central" },
  { district: "Asante Akim North", slug: "asante-akim-north" },
  { district: "Asante Akim South", slug: "asante-akim-south" },
  { district: "Asokore Mampong", slug: "asokore-mampong" },
  { district: "Asokwa", slug: "asokwa" },
  { district: "Atwima Kwanwoma", slug: "atwima-kwanwoma" },
  { district: "Atwima Mponua", slug: "atwima-mponua" },
  { district: "Atwima Nwabiagya North", slug: "atwima-nwabiagya-north" },
  { district: "Atwima Nwabiagya South", slug: "atwima-nwabiagya-south" },
  { district: "Bekwai", slug: "bekwai" },
  { district: "Bosome Freho", slug: "bosome-freho" },
  { district: "Bosomtwe", slug: "bosomtwe" },
  { district: "Ejisu", slug: "ejisu" },
  { district: "Ejura Sekyedumase", slug: "ejura-sekyedumase" },
  { district: "Juaben", slug: "juaben" },
  { district: "Kumawu", slug: "kumawu" },
  { district: "Kwabre East", slug: "kwabre-east" },
  { district: "Asante Mampong", slug: "asante-mampong" },
  { district: "Manhyia North", slug: "manhyia-north" },
  { district: "Manhyia South", slug: "manhyia-south" },
  { district: "Amansie South", slug: "amansie-south" },
  { district: "Amansie Central", slug: "amansie-central" },
  { district: "Amansie West", slug: "amansie-west" },
  { district: "New Edubiase", slug: "new-edubiase" },
  { district: "Nhyiaeso", slug: "nhyiaeso" },
  { district: "Obuasi East", slug: "obuasi-east" },
  { district: "Obuasi West", slug: "obuasi-west" },
  { district: "Offinso North", slug: "offinso-north" },
  { district: "Offinso South", slug: "offinso-south" },
  { district: "Old Tafo", slug: "old-tafo" },
  { district: "Sekyere Afram Plains", slug: "sekyere-afram-plains" },
  { district: "Sekyere Central", slug: "sekyere-central" },
  { district: "Sekyere East", slug: "sekyere-east" },
  { district: "Sekyere Kumawu", slug: "sekyere-kumawu" },
  { district: "Sekyere South", slug: "sekyere-south" },
  { district: "Suame", slug: "suame" },
  { district: "Subin", slug: "subin" },
  { district: "Ahafo Ano South", slug: "ahafo-ano-south" },
  { district: "Oforikrom", slug: "oforikrom" } 
];

const ashanti_districts = raw_ashanti_data.map(item => ({
    ...item,
    region_id: ashanti._id,
    country_id: country._id
}));

const seed_districts = async function() {
    try {
        await District.insertMany(ashanti_districts);
        system_logger.info("Districts have been seeded successfully");
        process.exit(0);
    } catch (error) {
        system_logger.error({ err: error }, "Error seeding data");
        process.exit(1);
    }
}

seed_districts();
