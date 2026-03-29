import express from "express";
import districtController from "../../controllers/index.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const districtRouter = express.Router();

districtRouter.post(
  "/createDistrict",
  authMiddleware,
  roleMiddleware("admin", "superAdmin"),
  districtController.createDistrict
);

export default districtRouter;
export { districtRouter };