import { Prof } from '../../models/models.js'
import bcrypt from 'bcrypt'

export class ProfessoresController {
    async criarProfessor(req, res) {
        try {
            const { nome, email, password } = req.body

            if (!nome || nome.trim() === "") return res.status(400).json({ erro: 'O nome precisa ser preenchido' })
            if (!email || email.trim() === "") return res.status(400).json({ erro: 'O email precisa ser preenchido' })
            if (!password || password.trim() === "") return res.status(400).json({ erro: 'O password precisa ser preenchido' })

            const userAlreadyExists = await Prof.findOne({ where: { email } })

            if (userAlreadyExists) return res.status(409).json({ erro: 'Ja existe um professor cadastrado' })

            const senhaHash = await bcrypt.hash(password, 10)

            const novoProfessor = await Prof.create({ nome, email, password: senhaHash })

            const { password: _, ...professorSemSenha } = novoProfessor.toJSON()
            res.status(201).json(professorSemSenha)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'não foi possivel criar o professor' })
        }
    }

    async listarProfessor(req, res) {
        try {
            const professores = await Prof.findAll({
                attributes: { exclude: ['password'] }
            })

            res.status(200).json(professores)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Falha ao buscar lista de professores' })
        }
    }

    async buscarProfessor(req, res) {
        try {
            const professorEncontrado = req.professorLocalizado
            res.status(200).json(professorEncontrado)
        } catch (error) {
            console.log(error.message)
            res.status(404).json({ erro: 'falha ao buscar professor' })
        }
    }

    async atualizarProfessor(req, res) {
        try {
            const { nome, email, password } = req.body

            const professorEncontrado = req.professorLocalizado

            if (email) {
                const emailAlreadyExists = await Prof.findOne({ where: { email } })

                if (emailAlreadyExists && emailAlreadyExists.id !== professorEncontrado.id) return res.status(409).json({ erro: 'esse email ja está em uso por outro professor' })
            }

            const dadosParaAtualizar = {}
            if (nome) dadosParaAtualizar.nome = nome
            if (email) dadosParaAtualizar.email = email
            if (password) {
                const senhaHash = await bcrypt.hash(password, 10)
                dadosParaAtualizar.password = senhaHash
            }

            await professorEncontrado.update(dadosParaAtualizar)
            res.status(200).json('Atualizado com sucesso')
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'falha ao buscar professor' })

        }
    }

    async deletarProfessor(req, res) {
        try {
            const professorEncontrado = req.professorLocalizado
            await professorEncontrado.destroy()
            res.status(204).json()
        } catch (error) {
            console.log(error.message)
            res.status(404).json({ erro: 'falha ao apagar professor' })
        }
    }
}