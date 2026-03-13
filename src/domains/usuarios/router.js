import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { UsuariosController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'
import { authAdmin } from '../../middlewares/authAdmin.js';

const userRouter = Router();
const usuariosController = new UsuariosController()

userRouter.post('/usuarios', authAdmin, validarDados, usuariosController.criarUsuario);
userRouter.get('/usuarios', authAdmin, usuariosController.listarUsuarios);
userRouter.get('/usuarios/:id', authAdmin, usuariosController.buscarUsuario);
userRouter.put('/usuarios/:id', authAdmin, validarAtualizacao, usuariosController.atualizarUsuario);
userRouter.delete('/usuarios/:id', authAdmin, usuariosController.deletarUsuario)

export default userRouter;