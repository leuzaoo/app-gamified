import express from "express";

import completedMissionController from "../controllers/mission.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/mission-completed", authenticateUser, completedMissionController);

export default router;
