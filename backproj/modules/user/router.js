import { Router } from "express";
import UserController from './controller.js';
import { validate } from "../middleware/validator.js";
import { registerDto } from "./dto/register-dto.js";
import { loginDto } from "./dto/login-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";

const router = Router();

router.post('/register', validate(registerDto), UserController.register);
router.post('/login', validate(loginDto), UserController.login);
//router.get('/me', TokenGuard.verify, UserController.getUser)
export default router