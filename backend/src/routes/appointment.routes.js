import { Router } from "express";
import { bookAppointment, getMyPatientAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(verifyJWT);

// Patient routes
router.post("/book", bookAppointment);
router.get("/my-appointments", restrictTo(ROLES.PATIENT), getMyPatientAppointments);

// Doctor routes
router.patch("/:appointmentId/status", restrictTo(ROLES.DOCTOR, ROLES.ADMIN), updateAppointmentStatus);

export default router;