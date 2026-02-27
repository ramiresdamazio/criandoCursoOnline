import express from 'express'
import 'dotenv/config'
import userRouter from './usuarios/router.js'

const app = express()
app.use(express.json())

app.use(userRouter)

app.listen(3000, () => console.log('servidor na porta http://localhost:3000'))
//jwt + bcrypt + migrations