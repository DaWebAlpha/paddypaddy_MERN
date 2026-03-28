import regionService from "../../services/location/region.service.js";
import autoCatchFn from "../../utils/autoCatchFn.js";
import { access_logger } from "../../core/pino.logger.js";

class RegionController{
    createRegion = autoCatchFn(async (req, res) =>{
        const result = await regionService.createRegion(req.body);
        
       
        access_logger.info(
          {
            method: req.method,
            url: req.originalUrl,
            user: req.user?._id || null,
          },
          "Create region endpoint hit"
        );

        return res.status(201).json({
            success: true,
            message: "Region successfully created",
            data: result
        })
    })
}

const regionController = new RegionController();

export default regionController;
export  {regionController, RegionController};