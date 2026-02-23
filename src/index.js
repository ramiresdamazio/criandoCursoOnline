import express from 'express'
import 'dotenv/config'
import sequelize from './db.js'
import User from './models/user.js'


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

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email, password } = req.body
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
app.listen(3000, () => console.log('servidor na porta http://localhost:3000'))