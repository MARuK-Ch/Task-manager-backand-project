import {Router} from "express";
import {AuthController} from "./auth.controller.js";
import {AuthService} from "./auth.service.js";

const authService = new AuthService()
const authController = new AuthController(authService)

const router = Router()
router.post('/login', authController.login)
router.post('/register', authController.register)

export default router