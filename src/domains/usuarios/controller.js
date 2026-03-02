import User from "../../models/models.js"

export class UsuariosController {
    async criarUsuario(req, res) {
        try {
            const { nome, email, password } = req.body

            const userAlreadyExists = await User.findOne({ where: { email } })

            if (userAlreadyExists) throw new Error('Já existe um usuário com esse email')

            const novoUsuario = await User.create({
                nome, email, password
            })

            res.status(201).json(novoUsuario)
        } catch (error) {
            res.status(400).json({ erro: 'não foi possivel criar o aluno', detalhes: error.message })
        }
    }

    async listarUsuarios(req, res) {
        try {
            const alunos = await User.findAll()
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
            res.status(404).json({ erro: 'falha ao buscar usuario', detalhes: error.message })
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