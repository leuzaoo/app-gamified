import express from "express";

import { authenticateUser } from "../middlewares/auth.middleware.js";
import setUsername from "../controllers/username.controller.js";

const router = express.Router();

router.put("/", authenticateUser, setUsername);

export default router;
