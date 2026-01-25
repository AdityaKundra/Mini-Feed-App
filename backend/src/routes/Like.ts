import express from "express";
const router = express.Router();
import { handleLike } from "../controllers/LikeController";

// Routers
router.post('/:id', handleLike);

export default router;