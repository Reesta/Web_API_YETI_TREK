import { Router } from "express";
import { AdminBookingController } from "../../controllers/admin/booking.controller";
import { adminMiddleware, authorizedMiddleware } from "../../middlewares/auth.middleware";

const adminBookingRouter = Router();
const adminBookingController = new AdminBookingController();

adminBookingRouter.use(authorizedMiddleware, adminMiddleware);

adminBookingRouter.get("/", adminBookingController.getAllBookings);
adminBookingRouter.get("/:id", adminBookingController.getBookingById);
adminBookingRouter.put("/:id", adminBookingController.updateBooking);
adminBookingRouter.patch("/:id", adminBookingController.updateBooking);
adminBookingRouter.delete("/:id", adminBookingController.deleteBooking);

export default adminBookingRouter;
