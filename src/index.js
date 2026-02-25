import express from 'express'
import 'dotenv/config'
import sequelize from './db.js'
import User from './models/user.js'
import { validarDados } from './middlewares/validacao.js'
import { validarAtualizacao } from './middlewares/validacao.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'servidor sequelize on' })
})

try {
    await sequelize.authenticate()
    console.log('Deu certo, conectado com sucesso')
    await sequelize.sync()
    console.log('tabelas sincronizadas')
} catch (error) {
    console.log('Problema na conexão com o banco', error)
}

app.post('/usuarios', validarDados, async (req, res) => {
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
})

app.get('/usuarios', async (req, res) => {
    try {
        const alunos = await User.findAll()
        res.status(200).json(alunos)
    } catch (error) {
        res.status(500).json({ erro: 'Falha ao buscar usuários', detalhes: error.message })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        const idDoAluno = req.params.id
        const alunoEncontrado = await User.findByPk(idDoAluno)
        if (!alunoEncontrado) throw new Error('Aluno não existe')
        res.status(200).json(alunoEncontrado)
    } catch (error) {
        res.status(404).json({ erro: 'falha ao buscar usuario', detalhes: error.message })
    }
})

app.put('/usuarios/:id', validarAtualizacao, async (req, res) => {
    try {
        const idDoAluno = req.params.id

        const alunoEncontrado = await User.findByPk(idDoAluno)

        if (!alunoEncontrado) throw new Error('Aluno não existe')

        const { nome, email } = req.body

        await alunoEncontrado.update({ nome, email })

        res.status(200).json('Atualizado com sucesso')

    } catch (error) {

        res.status(404).json({ erro: 'falha ao atualizar usuario', detalhes: error.message })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const idDoAluno = req.params.id
        const alunoEncontrado = await User.findByPk(idDoAluno)
        if (!alunoEncontrado) throw new Error('Aluno não existe')
        await alunoEncontrado.destroy()
        res.status(200).json(alunoEncontrado)
    } catch (error) {
        res.status(404).json({ erro: 'falha ao apagar usuario', detalhes: error.message })
    }
})
app.listen(3000, () => console.log('servidor na porta http://localhost:3000'))