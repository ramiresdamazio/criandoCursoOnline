import { Router } from 'express';
import { AuthController } from './controller.js';

const adminRouter = Router()
const AuthController = new Authcontroller()

adminRouter.post('/login', AuthController)
