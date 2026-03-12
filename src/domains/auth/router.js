import { Router } from 'express';
import { AuthController } from './controller.js';

const adminRouter = Router()
const authController = new AuthController()

adminRouter.post('/login', (req, res) => authController.login(req, res))

export default adminRouter