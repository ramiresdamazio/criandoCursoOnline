import { Prof } from '../../models/models.js'

export class ProfessoresController {
    async criarProfessor(req, res) {
        const { nome, email, password } = req.body

        const userAlreadyExists = await Prof.findOne({ where: { email } })

        if (userAlreadyExists) throw new Error('Ja existe um professor cadastrado com esse email')

        const novoProfessor = await Prof.create({ nome, email, password })
        res.status(201).json(novoProfessor)

    } catch(error) {
        res.status(400).json({ erro: 'não foi possivel criar o aluno', detalhes: error.message })
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
            const idDoProfessor = req.body.id
            const professorEncontrado = await Prof.findByPk(idDoProfessor)
            if (!professorEncontrado) throw new Error('Professor não existe')
            res.status(200).json(professorEncontrado)
        } catch (error) {
            res.status(404).json({ erro: 'falha ao buscar professor', detalhes: error.message })
        }
    }
}