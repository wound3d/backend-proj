import { Router } from "express";
import CommentController from './controller.js';
import { validate, CONTEXT} from '../middleware/validator.js'
import { delDto } from "./dto/del-dto.js";
import { addDto } from "./dto/add-dto.js";
import { updDto } from "./dto/upd-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";
const router = Router();

router.post('/add', TokenGuard.verify, validate(addDto), CommentController.addComment);
router.get('/cget/', CommentController.getAllComments)
router.put('/cupd/:id', validate(updDto), CommentController.updateComment)
router.delete('/cdel/:id', validate(delDto), CommentController.deleteComment)
router.delete('/csdel', CommentController.deleteComments)
export default router