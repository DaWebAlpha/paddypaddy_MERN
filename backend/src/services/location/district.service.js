import { regionRepository, districtRepository } from "../../repositories/location/district.repository.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";
import { formatSlug, formatName } from "../../utils/string.utils.js";
import { BadRequestError } from '../../errors/bad-request.error.js';
import { ConflictError } from "../../errors/conflict.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";

class DistrictService {
  async createDistrict(payload) {
    const district = formatName(String(payload?.district ?? ""));
    const region_slug = formatSlug(String(payload?.region_slug ?? ""));

    if (!district) {
      system_logger.error("District is required");
      throw new BadRequestError("District is required");
    }

    if (!region_slug) {
      system_logger.error("Region slug is required");
      throw new BadRequestError("Region slug is required");
    }

    const region = await regionRepository.findOne({
      slug: region_slug,
      is_deleted: false,
    });

    if (!region) {
      system_logger.error("Region does not exist");
      throw new NotFoundError("Region does not exist");
    }

    const districtExists = await districtRepository.existsByDistrictAndRegion(
      district,
      region._id
    );

    if (districtExists) {
      system_logger.error("District already exists in this region");
      throw new ConflictError("District already exists in this region");
    }

    const createdDistrict = await districtRepository.create({
      district,
      region_id: region._id
    });

    audit_logger.info(
      {
        district_id: createdDistrict._id,
        district: createdDistrict.district,
        region_id: createdDistrict.region_id,
      },
      "District created successfully"
    );

    return {
      district: createdDistrict,
      message: "District created successfully"
    };
  }
}

const districtService = new DistrictService();

export default districtService;
export { districtService, DistrictService };