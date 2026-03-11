import { Prof } from '../models/models.js'
export const validarIdProfessor = async (req, res, next) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ erro: 'ID inválido' })

    const professorEncontrado = await Prof.findByPk(id, { attributes: { exclude: ['password'] } })

    if (!professorEncontrado) return res.status(404).json({ erro: 'Professor não encontrado' })

    req.professorLocalizado = professorEncontrado

    next()
}

