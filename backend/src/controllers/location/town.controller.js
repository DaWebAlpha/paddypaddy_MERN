import townService from "../../services/location/town.service.js";
import autoCatchFn from "../../utils/autoCatchFn.js";
import { audit_logger } from "../../core/pino.logger.js";

class TownController{
    createTown = autoCatchFn(async (req, res) =>{
        const result = await townService.createTown(req.body);
        
       
        access_logger.info(
          {
            method: req.method,
            url: req.originalUrl,
            user: req.user?._id || null,
          },
          "Create town endpoint hit"
        );

        return res.status(201).json({
            success: true,
            message: "Town successfully created",
            data: result
        })
    })
}

const townController = new TownController();

export default townController;
export  {townController, TownController};