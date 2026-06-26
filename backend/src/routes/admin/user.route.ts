import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";
import { adminMiddleware, authorizedMiddleware } from "../../middlewares/auth.middleware";

const adminUserRouter = Router();
const adminUserController = new AdminUserController();

adminUserRouter.get(
  "/",
  authorizedMiddleware,
  adminMiddleware,
  adminUserController.getAllUsers,
);

export default adminUserRouter;
