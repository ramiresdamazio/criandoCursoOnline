import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { ProfessoresController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'
import { validarIdProfessor } from '../../middlewares/validarIdProfessor.js'
import { authAdmin } from '../../middlewares/authAdmin.js';

const profRouter = Router()
const professoresController = new ProfessoresController()

profRouter.post('/professores', authAdmin, validarDados, professoresController.criarProfessor);
profRouter.get('/professores', authAdmin, professoresController.listarProfessor)
profRouter.get('/professores/:id', authAdmin, validarIdProfessor, professoresController.buscarProfessor)
profRouter.put('/professores/:id', authAdmin, validarIdProfessor, professoresController.atualizarProfessor)
profRouter.delete('/professores/:id', authAdmin, validarIdProfessor, professoresController.deletarProfessor)


export default profRouter;
