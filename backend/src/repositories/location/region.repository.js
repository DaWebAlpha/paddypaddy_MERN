import BaseRepository from "../base.repository.js";
import Region from "../../models/location/region.model.js";
import { formatTitle } from "../../utils/string.utils.js";

class RegionRepository extends BaseRepository {
  constructor() {
    super(Region);
  }

  async existsByRegion(region) {
    const regionExists = await this.exists({
      region: formatTitle(String(region || "").trim()),
      is_deleted: false,
    });
    return !!regionExists;
  }

  async existsByRegionAndCountry(region, country_id) {
    const regionExists = await this.exists({
      region: formatTitle(String(region || "").trim()),
      country_id,
      is_deleted: false,
    });
    return !!regionExists;
  }
}

const regionRepository = new RegionRepository();

export default regionRepository;
export { regionRepository };