import express from "express";
import townController from "../../controllers/index.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const townRouter = express.Router();

townRouter.post(
  "/createTown",
  authMiddleware,
  roleMiddleware("admin", "superAdmin"),
  townController.createTown
);

export default townRouter;
export { townRouter };