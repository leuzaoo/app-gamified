import express from "express";

import { checkAuthController } from "../controllers/checkAuth.controller.js";
import { registerController } from "../controllers/register.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-auth", authenticateUser, checkAuthController);

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
