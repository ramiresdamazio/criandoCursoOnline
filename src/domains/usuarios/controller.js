import { User } from '../../models/models.js'
import bcrypt from 'bcrypt'

export class UsuariosController {
    async criarUsuario(req, res) {
        try {
            const { nome, email, password } = req.body

            if (!nome || nome.trim() === '') return res.status(400).json({ erro: 'O nome precisa ser preenchido' })
            if (!email || email.trim() === '') return res.status(400).json({ erro: 'O email precisa ser preenchido' })
            if (!password) return res.status(400).json({ erro: 'O password precisa ser preenchido' })

            const userAlreadyExists = await User.findOne({ where: { email } })

            if (userAlreadyExists) return res.status(409).json({ erro: 'O usuário ja existe' })

            const senhaHash = await bcrypt.hash(password, 10)

            const novoUsuario = await User.create({
                nome, email, password: senhaHash
            })

            const { password: _, ...usuarioSemSenha } = novoUsuario.toJSON()
            res.status(201).json(usuarioSemSenha)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'não foi possivel criar o aluno' })
        }
    }

    async listarUsuarios(req, res) {
        try {
            const alunos = await User.findAll({
                attributes: { exclude: ['password'] }
            })

            res.status(200).json(alunos)
        } catch (error) {
            res.status(500).json({ erro: 'Falha ao buscar usuários', detalhes: error.message })
        }
    }

    async buscarUsuario(req, res) {
        try {
            const idDoAluno = req.params.id
            const alunoEncontrado = await User.findByPk(idDoAluno)
            if (!alunoEncontrado) throw new Error('Aluno não existe')
            res.status(200).json(alunoEncontrado)

        } catch (error) {
            res.status(409).json({ erro: 'falha ao buscar usuario', detalhes: error.message })
        }
    }

    async atualizarUsuario(req, res) {
        try {
            const idDoAluno = req.params.id

            const alunoEncontrado = await User.findByPk(idDoAluno)

            if (!alunoEncontrado) throw new Error('Aluno não existe')

            const data = req.body

            await alunoEncontrado.update(data)

            res.status(200).json('Atualizado com sucesso')

        } catch (error) {
            res.status(404).json({ erro: 'falha ao atualizar usuario', detalhes: error.message })
        }
    }
    async deletarUsuario(req, res) {
        try {
            const idDoAluno = req.params.id
            const alunoEncontrado = await User.findByPk(idDoAluno)
            if (!alunoEncontrado) throw new Error('Aluno não existe')
            await alunoEncontrado.destroy()
            res.status(200).json(alunoEncontrado)
        } catch (error) {
            res.status(404).json({ erro: 'falha ao apagar usuario', detalhes: error.message })
        }
    }
}
