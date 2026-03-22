import { countryRepository, regionRepository } from "../../repositories/index.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";
import { formatSlug, formatName } from "../../utils/string.utils.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError
} from "../../errors/index.js";



class RegionService {
  async createRegion(payload) {
    const region = formatName(String(payload?.region ?? ""));
    const country_slug = formatSlug(String(payload?.country_slug ?? ""));

    if (!region) {
      system_logger.error("Region is required");
      throw new BadRequestError("Region is required");
    }

    if (!country_slug) {
      system_logger.error("Country slug is required");
      throw new BadRequestError("Country slug is required");
    }

    const country = await countryRepository.findOne({ slug: country_slug }).lean();

    if (!country) {
      system_logger.error("Country does not exist");
      throw new NotFoundError("Country does not exist");
    }

    const regionExists = await regionRepository.existsByRegionAndCountry(
      region,
      country._id
    );

    if (regionExists) {
      system_logger.error("Region already exists in this country");
      throw new ConflictError("Region already exists in this country");
    }

    const createdRegion = await regionRepository.create({
      region,
      country_id: country._id,
    });

    audit_logger.info(
      {
        region_id: createdRegion._id,
        region: createdRegion.region,
        country_id: createdRegion.country_id,
      },
      "Region created successfully"
    );

    return {
      region: createdRegion,
      message: "Region created successfully",
    };
  }
}

const regionService = new RegionService();

export default regionService;
export { regionService, RegionService };