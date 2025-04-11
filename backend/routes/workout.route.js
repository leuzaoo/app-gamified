import express from "express";

import setWorkoutController from "../controllers/workout.controller.js";
import { authenticateUser } from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/set-workout", authenticateUser, setWorkoutController);

export default router;
