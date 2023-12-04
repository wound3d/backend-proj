import { Router } from "express";
import UserController from './controller.js';
import { TokenGuard } from "../middleware/token-guard.js";
const router = Router();

router.post('/register', UserController.register);
router.get('/me', TokenGuard.verify, UserController.getUser)
export default router