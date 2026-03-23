import { districtRepository, townRepository } from "../../repositories/index.js";
import { system_logger, audit_logger } from "../../core/pino.logger.js";
import { formatSlug, formatName } from "../../utils/string.utils.js";
import {
    BadRequestError,
    NotFoundError,
    ConflictError
} from "../../errors/index.js";


class TownService{
    async createTown(payload){
        const town = formatName(String(payload?.town ?? ""));
        const district_slug = formatSlug(String(payload?.district_slug ?? ""));

        if(!town){
            system_logger.error("Town is required");
            throw new BadRequestError("Town is required");
        }

        if(!district_slug){
            system_logger.error("District slug is required");
            throw new BadRequestError("District slug is required");
        }

        const district = await districtRepository.findOne({slug: district_slug}).lean();
        
        if(!district){
            system_logger.error("District does not exist");
            throw new NotFoundError("District does not exist");
        }

        const townExists = await townRepository.existsByTownAndDistrict(
            town,
            district._id
        )

        if(townExists){
            system_logger.error("Town already exists in this district");
            throw new ConflictError("Town already exists in this district");
        }

        const createdTown = await townRepository.create({
            town,
            district_id: district._id,
        })

        audit_logger.info(
            {
                town_id: createdTown._id,
                town: createdTown.town,
                district_id: createdTown.district_id
            },
            "Town successfully created"
        )

        return {
            town: createdTown,
            message: "Town created successfully"
        }
    }
}

const townService = new TownService();
export default townService;
export { townService, TownService };