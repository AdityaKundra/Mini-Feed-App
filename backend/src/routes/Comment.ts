import express from "express";
const router = express.Router();
import { addComment, getComments, editComment, deleteComment } from '../controllers/CommentController';
// Routers

router.post('/:id', addComment)
router.get('/:id',getComments);
router.put('/:id', editComment)
router.delete('/:id', deleteComment)

export default router;