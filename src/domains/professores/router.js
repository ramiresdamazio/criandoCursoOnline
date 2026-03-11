import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { ProfessoresController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'
import { validarIdProfessor } from '../../middlewares/validarIdProfessor.js'

const profRouter = Router()
const professoresController = new ProfessoresController()

profRouter.post('/professores', validarDados, professoresController.criarProfessor);
profRouter.get('/professores', professoresController.listarProfessor)
profRouter.get('/professores/:id', validarIdProfessor, professoresController.buscarProfessor)
profRouter.put('/professores/:id', validarIdProfessor, professoresController.atualizarProfessor)
profRouter.delete('/professores/:id', validarIdProfessor, professoresController.deletarProfessor)


export default profRouter;
