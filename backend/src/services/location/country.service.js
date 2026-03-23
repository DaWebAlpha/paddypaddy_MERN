import { countryRepository } from "../../repositories/index.js";
import {system_logger, audit_logger} from "../../core/pino.logger.js";
import { cleanName, formatName } from "../../utils/string.utils.js";
import {
  BadRequestError,
  ConflictError
} from "../../errors/index.js";
import { autoCatchFn } from "../../lib/autoCatchFn.js";

class CountryService{
    async createCountry(payload){
        const country = formatName(String(payload?.country ?? ""));
        const iso_code = cleanName(String(payload?.iso_code ?? "")).toUpperCase();


        if(!country){
            system_logger.error("Country is required");
            throw new BadRequestError("Country is required");
        }

        if(!iso_code){
            system_logger.error("Iso code is required");
            throw new BadRequestError("Iso code is required");
        }

        const [countryExists, isoExists] = await Promise.all([
            countryRepository.existsByCountry(country),
            countryRepository.existsByIso_code(iso_code)
        ])

        if(countryExists){
            system_logger.error("Country already exists");
            throw new ConflictError("Country already exists");
        }

        if(isoExists){
            system_logger.error("Iso_code already exists");
            throw new ConflictError("Iso_code already exists");
        }

        const createdCountry = await countryRepository.create({
            country,
            iso_code,
        })

        audit_logger.info(
            {
                country_id: createdCountry._id,
                country: createdCountry.country,
                iso_code: createdCountry.iso_code
            },
            "Country successfully created"
        );

        return {
            createdCountry,
            message: "Country created successfully"
        }
    }
}

const countryService = new CountryService;


export default countryService;
export { countryService, CountryService };