import express from "express";

import { authenticateUser } from "./../middlewares/auth.middleware.js";

import {
  getDailyGoalsController,
  getDailyWorkoutController,
} from "../controllers/workout/dailyWorkout.controller.js";

import {
  addExerciseController,
  completeWorkoutController,
  createWorkoutController,
  getCustomWorkoutController,
  getExercisesWorkoutsController,
  getWorkoutHistoryController,
  listWorkoutsController,
  setWorkoutController,
} from "../controllers/workout/workout.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/get-daily-workout", getDailyWorkoutController);
router.get("/get-daily-goals", getDailyGoalsController);
router.get("/history", getWorkoutHistoryController);
router.get("/get-exercises", getExercisesWorkoutsController);

router.get("/:id", getCustomWorkoutController);

router.get("/", listWorkoutsController);

router.post("/set-workout", setWorkoutController);
router.post("/complete-workout", completeWorkoutController);

router.post("/:id/exercises", addExerciseController);

router.post("/", createWorkoutController);

export default router;
