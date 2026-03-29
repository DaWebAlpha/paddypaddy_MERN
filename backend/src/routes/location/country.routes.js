import express from "express";
import countryController from "../../controllers/index.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const countryRouter = express.Router();

countryRouter.post(
  "/createCountry",
  authMiddleware,
  roleMiddleware("admin", "superAdmin"),
  countryController.createCountry
);

export default countryRouter;
export { countryRouter };