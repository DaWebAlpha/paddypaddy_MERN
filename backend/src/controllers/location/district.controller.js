import districtService from "../../services/location/district.service.js";
import autoCatchFn from "../../utils/autoCatchFn.js";
import { audit_logger } from "../../core/pino.logger.js";

class DistrictController{
    createDistrict = autoCatchFn(async (req, res) =>{
        const result = await districtService.createDistrict(req.body);
        
       
        access_logger.info(
          {
            method: req.method,
            url: req.originalUrl,
            user: req.user?._id || null,
          },
          "Create district endpoint hit"
        );

        return res.status(201).json({
            success: true,
            message: "District successfully created",
            data: result
        })
    })
}

const districtController = new DistrictController();

export default districtController;
export  {districtController, DistrictController};