import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { ProfessoresController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'

const profRouter = Router()
const professoresController = new ProfessoresController()

profRouter.post('/professores', validarDados, professoresController.criarProfessor);


export default profRouter;
