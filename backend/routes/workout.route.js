import express from "express";

import setWorkoutController, {
  completeWorkoutController,
} from "../controllers/workout.controller.js";
import { authenticateUser } from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/set-workout", authenticateUser, setWorkoutController);
router.post("/complete-workout", authenticateUser, completeWorkoutController);

export default router;
