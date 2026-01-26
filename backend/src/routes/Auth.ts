import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getUserById } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/auth.middleware';

// Routers
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware, getUserById);

export default router;