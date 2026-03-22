import BaseRepository from "../base.repository.js";
import Town from "../../models/location/town.model.js";
import { formatName } from "../../utils/string.utils.js";


class TownRepository extends BaseRepository{
    constructor(){
        super(Town);
    }

    async existsByTownAndDistrict(town, district_id, options = {}){
        if(!district_id) return false;

        const townExists = await this.exists({
            town: formatName(String(town || "").trim()),
            district_id,
            is_deleted: false
        }, options)

        return !!townExists;
    }
}

const townRepository = new TownRepository();
export default townRepository;
export { townRepository };