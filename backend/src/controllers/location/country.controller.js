import countryService from "../../services/location/country.service.js";
import autoCatchFn from "../../utils/autoCatchFn.js";
import { access_logger } from "../../core/pino.logger.js";

class CountryController{
    createCountry = autoCatchFn(async (req, res) =>{
        const result = await countryService.createCountry(req.body);
             
        access_logger.info(
          {
            method: req.method,
            url: req.originalUrl,
            user: req.user?._id || null,
          },
          "Create country endpoint hit"
        );

        return res.status(201).json({
            success: true,
            message: "Country successfully created",
            data: result
        })
    })
}

const countryController = new CountryController();

export default countryController;
export  {countryController, CountryController};