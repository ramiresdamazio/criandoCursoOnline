import { Prof } from '../../models/models.js'

export class ProfessoresController {
    async criarProfessor(req, res) {
        try {
            const { nome, email, password } = req.body

            if (!nome || nome.trim() === "") return res.status(400).json({
                erro: 'O nome precisa ser preenchido'
            })
            if (!email || email.trim() === "") return res.status(400).json({
                erro: 'O email precisa ser preenchido'
            })
            if (!password || password.trim() === "") return res.status(400).json({ erro: 'O passowrd precisa ser preenchido' })

            const userAlreadyExists = await Prof.findOne({ where: { email } })

            if (userAlreadyExists) return res.status(409).json({ erro: 'Ja existe um professor cadastrado' })

            const senhaHash = await bcrypt.hash(password, 10)

            const novoProfessor = await Prof.create({ nome, email, password: senhaHash })
            res.status(201).json(novoProfessor)

        } catch (error) {
            res.status(400).json({ erro: 'não foi possivel criar o professor', detalhes: error.message })
        }
    }

    async listarProfessor(req, res) {
        try {
            const professores = await Prof.findAll()
            res.status(200).json(professores)
        } catch (error) {
            res.status(400).json({ erro: 'Falha ao buscar lista de professores', detalhes: error.message })
        }
    }

    async buscarProfessor(req, res) {
        try {
            const idDoProfessor = req.params.id
            const professorEncontrado = await Prof.findByPk(idDoProfessor)
            if (!professorEncontrado) throw new Error('Professor não existe')
            res.status(200).json(professorEncontrado)
        } catch (error) {
            res.status(404).json({ erro: 'falha ao buscar professor', detalhes: error.message })
        }
    }

    async atualizarProfessor(req, res) {
        try {
            const idDoProfessor = req.params.id
            const professorEncontrado = await Prof.findByPk(idDoProfessor)
            if (!professorEncontrado) throw new Error('Professor não existe')

            const data = req.body
            await professorEncontrado.update(data)
            res.status(200).json('Atualizado com sucesso')
        } catch (error) {
            res.status(404).json({ erro: 'falha ao buscar professor', detalhes: error.message })

        }
    }

    async deletarProfessor(req, res) {
        try {
            const idDoProfessor = req.params.id
            const professorEncontrado = await Prof.findByPk(idDoProfessor)
            if (!professorEncontrado) throw new Error('Profssor não existe')

            const data = req.body
            await professorEncontrado.destroy(data)
            res.status(200).json('Deletado com sucesso')
        } catch (error) {
            res.status(404).json({ erro: 'falha ao buscar professor', detalhes: error.message })
        }
    }
}