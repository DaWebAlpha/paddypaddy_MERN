import BaseRepository from "../base.repository.js";
import Country from "../../models/location/country.model.js";
import { formatTitle, formatSlug, cleanName } from "../../utils/string.utils.js";

class CountryRepository extends BaseRepository {
  constructor() {
    super(Country);
  }

  async existsByCountry(country) {
    const countryExists = await this.exists({
      country: formatTitle(String(country || "").trim()),
      is_deleted: false,
    });
    return !!countryExists;
  }

  async existsByIso_code(iso_code) {
    const isoCodeExists = await this.exists({
      iso_code: cleanName(String(iso_code || "").trim()).toUpperCase(),
      is_deleted: false,
    });
    return !!isoCodeExists;
  }

  async existsBySlug(slug) {
    const slugExists = await this.exists({
      slug: formatSlug(String(slug || "").trim()),
      is_deleted: false,
    });
    return !!slugExists;
  }
}

const countryRepository = new CountryRepository();

export default countryRepository;
export { CountryRepository };