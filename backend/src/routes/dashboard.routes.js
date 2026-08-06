import { Router } from "express";
import { getAdminDashboardStats } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(verifyJWT);
router.use(restrictTo(ROLES.ADMIN));

router.get("/stats", getAdminDashboardStats);

export default router;