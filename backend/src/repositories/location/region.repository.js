import BaseRepository from "../base.repository.js";
import Region from "../../models/location/region.model.js";
import { formatName } from "../../utils/string.utils.js";

class RegionRepository extends BaseRepository {
  constructor() {
    super(Region);
  }

 
  async existsByRegionAndCountry(region, country_id, options = {}) {
    if(!country_id) return false;
    const regionExists = await this.exists(
      {
      region: formatName(String(region || "").trim()),
      country_id,
      is_deleted: false,
      },
      options
  );
    return !!regionExists;
  }
}

const regionRepository = new RegionRepository();

export default regionRepository;
export { regionRepository };