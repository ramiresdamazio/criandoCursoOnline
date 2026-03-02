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
}