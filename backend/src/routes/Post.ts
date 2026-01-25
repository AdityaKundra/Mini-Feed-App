import express from "express";
const router = express.Router();
import {createPost, getFeed, getPost, updatePost, deletePost} from '../controllers/PostController';

// Routers
router.post('/',createPost);
router.get('/feed',getFeed);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;