import express from "express";
const router = express.Router();
import {createPost, getFeed, getPost, updatePost, deletePost} from '../controllers/PostController';
import { uploadLimiter } from '../middleware/security.middleware';

// Routers
router.post('/', uploadLimiter, createPost);
router.get('/feed',getFeed);
router.get('/:id', getPost);
router.put('/:id', uploadLimiter, updatePost);
router.delete('/:id', deletePost);

export default router;