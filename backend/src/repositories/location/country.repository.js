import BaseRepository from "../base.repository.js";
import Country from "../../models/location/country.model.js";
import { formatName, formatSlug, cleanName } from "../../utils/string.utils.js";

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country);
  }

  async existsByCountry(country, options = {}) {
    const countryExists = await this.exists(
      {
      country: formatName(String(country || "")),
      is_deleted: false,
     },
     options
  );
    return !!countryExists;
  }


  async existsByIso_code(iso_code, options = {}) {
    const isoCodeExists = await this.exists(
      {
        iso_code: cleanName(String(iso_code || "")).toUpperCase(),
        is_deleted: false,
      },
      options
    );
    return !!isoCodeExists;
  }


  async existsBySlug(slug, options = {}) {
    const slugExists = await this.exists(
      {
        slug: formatSlug(String(slug || "")),
        is_deleted: false,
      },
      options
  );
    return !!slugExists;
  }
}

const countryRepository = new CountryRepository();

export default countryRepository;
export { countryRepository, CountryRepository };