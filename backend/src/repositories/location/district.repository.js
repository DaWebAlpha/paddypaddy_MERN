import BaseRepository from "../base.repository.js";
import District from "../../models/location/district.model.js";
import { formatTitle } from "../../utils/string.utils.js";

class DistrictRepository extends BaseRepository{
    constructor(){
        super(District);
    }

    
    async existsByDistrictAndRegion(district, region_id){
        if(!region_id) return false;

        const districtExists = await this.exists({
            district: formatTitle(String(district || '').trim()),
            region_id,
            is_deleted: false
        }) ;
        return !!districtExists;
    }


}

const districtRepository = new DistrictRepository();
export default districtRepository;
export { districtRepository };