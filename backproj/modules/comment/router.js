import { Router } from "express";
import CommentController from './controller.js';
import { TokenGuard } from "../middleware/token-guard.js";
const router = Router();

router.post('/add', TokenGuard.verify, CommentController.addComment);
router.get('/cget/:id', CommentController.getComment)
router.put('/cupd/:id', CommentController.updateComment)
router.delete('/cdel/:id', CommentController.deleteComment)
router.delete('/csdel', CommentController.deleteComments)
export default router