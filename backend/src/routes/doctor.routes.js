import { Router } from "express";
import { createProfile, getAllDoctors } from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(verifyJWT);

// Patients and Admins can view doctors
router.get("/", getAllDoctors); 

// Only doctors can create their specific profile
router.post("/profile", createProfile);

export default router;