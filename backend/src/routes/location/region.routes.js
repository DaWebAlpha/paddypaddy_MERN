import express from "express";
import regionController from "../../controllers/index.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const regionRouter = express.Router();

regionRouter.post(
  "/createRegion",
  authMiddleware,
  roleMiddleware("admin", "superAdmin"),
  regionController.createRegion
);

export default regionRouter;
export { regionRouter };