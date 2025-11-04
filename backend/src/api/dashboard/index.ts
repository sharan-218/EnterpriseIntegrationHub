import { Router } from "express";
import { DashboardController } from "../../controllers/dashboardController";

const router = Router();

router.get("/", DashboardController.getDashboardData);

export default router;
