import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { ProfessoresController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'

const profRouter = Router()
const professoresController = new ProfessoresController()

profRouter.post('/professores', validarDados, professoresController.criarProfessor);
profRouter.get('/professores', professoresController.listarProfessor)
profRouter.get('/professores/:id', professoresController.buscarProfessor)


export default profRouter;
