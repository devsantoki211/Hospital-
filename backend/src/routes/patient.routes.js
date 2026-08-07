import { Router } from "express";
import { createProfile, getMyProfile } from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(verifyJWT); // All patient routes require authentication
// router.use(restrictTo(ROLES.PATIENT)); // Only patients can access these

router.post("/profile", createProfile);
router.get("/profile", getMyProfile);

export default router;