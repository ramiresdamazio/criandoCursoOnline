import express from 'express'
import 'dotenv/config'
import userRouter from './domains/usuarios/router.js'
import sequelize from './db.js'
const app = express()
app.use(express.json())

try {
    await sequelize.authenticate()
    console.log('Deu certo, conectado com sucesso')
    await sequelize.sync()
    console.log('tabelas sincronizadas')
} catch (error) {
    console.log('Problema na conexão com o banco', error)
}

app.use(userRouter)

app.listen(3000, () => console.log('servidor na porta http://localhost:3000'))
//jwt + bcrypt + migrations