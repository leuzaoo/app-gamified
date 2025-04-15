import express from "express";

import { authenticateUser } from "./../middlewares/auth.middleware.js";

import {
  getDailyGoalsController,
  getDailyWorkoutController,
} from "../controllers/workout/dailyWorkout.controller.js";

import setWorkoutController, {
  completeWorkoutController,
  getWorkoutHistoryController,
} from "../controllers/workout/workout.controller.js";

const router = express.Router();

router.get("/get-daily-workout", authenticateUser, getDailyWorkoutController);
router.get("/get-daily-goals", authenticateUser, getDailyGoalsController);
router.get("/history", authenticateUser, getWorkoutHistoryController);

router.post("/set-workout", authenticateUser, setWorkoutController);
router.post("/complete-workout", authenticateUser, completeWorkoutController);

export default router;
