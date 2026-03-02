import { Router } from 'express';
import { validarDados } from '../../middlewares/validacao.js';
import { UsuariosController } from './controller.js';
import { validarAtualizacao } from '../../middlewares/validacao.js'

const userRouter = Router();
const usuariosController = new UsuariosController()

userRouter.post('/usuarios', validarDados, usuariosController.criarUsuario);
userRouter.get('/usuarios', usuariosController.listarUsuarios);
userRouter.get('/usuarios/:id', usuariosController.buscarUsuario);
userRouter.put('/usuarios/:id', validarAtualizacao, usuariosController.atualizarUsuario);
userRouter.delete('/usuarios/:id', usuariosController.deletarUsuario)

export default userRouter;