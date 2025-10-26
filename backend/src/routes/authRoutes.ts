import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { registerValidator, loginValidator } from "../validators/authValidator";
import { validate } from "../middleware/validation";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", authMiddleware, getMe);

export default router;
