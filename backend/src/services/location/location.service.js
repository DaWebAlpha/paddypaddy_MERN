import
   {countryRepository, regionRepository} 
    from "../../repositories/index.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";


class LocationService {
  async createRegion(payload){
    const region = String(payload.region || "").trim();
    const country_slug = String(payload.country_slug || "").trim().toLowerCase();
    if(!region){
        system_logger.error("Region is required");
        throw new Error("Region is required");
    }
    if(!country_slug){
        system_logger.error("Country slug is required");
        throw new Error("Country slug is required");
    }
    const [regionExists, countrySlugExists] = await Promise.all([
        regionRepository.existsByRegion(region),
        countryRepository.existsBySlug(country_slug)
    ])

    if(regionExists){
        system_logger.error("Region already exists");
        throw new Error("Region already exists");
    }

    if(!countrySlugExists){
        system_logger.error("Country slug must exist to continue");
        throw new Error("Country slug must exist to continue");
    }

    const country = await countryRepository.findOne({slug: country_slug}).lean();

    if(!country){
      system_logger.error("Country does not exist");
      throw new Error("Country does not exists")
    }

    const createRegion = await regionRepository.create({
        region,
        country_id: country._id,
    })

    audit_logger.info(
        {
            region_id: createRegion._id,
            region: createRegion.region,
            country_id: createRegion.country_id
        },
        "Region created successfully"
    )

    return {
        region: createRegion,
        message: "Region created successfully"
    }
  }


  async createCountry(payload) {
    const country = String(payload.country || "").trim();
    const iso_code = String(payload.iso_code || "").trim().toUpperCase();

    if (!country) {
      system_logger.error("Country is required");
      throw new Error("Country is required");
    }

    if (!iso_code) {
      system_logger.error("ISO code is required");
      throw new Error("ISO code is required");
    }

    const [countryExists, isoExists] = await Promise.all([
      countryRepository.existsByCountry(country),
      countryRepository.existsByIso_code(iso_code),
    ]);

    if (countryExists) {
      system_logger.error("Country already exists");
      throw new Error("Country already exists");
    }

    if (isoExists) {
      system_logger.error("ISO code already exists");
      throw new Error("ISO code already exists");
    }

    const createdCountry = await countryRepository.create({
      country,
      iso_code,
    });

    audit_logger.info(
      {
        country_id: createdCountry._id,
        country: createdCountry.country,
        iso_code: createdCountry.iso_code,
      },
      "Country successfully created"
    );

    return {
      country: createdCountry,
      message: "Country created successfully",
    };
  }
}

const locationService = new LocationService();

export default locationService;
export { LocationService };