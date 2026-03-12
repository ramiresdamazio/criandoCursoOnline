import jwt from 'jsonwebtoken'

export function authAdmin(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' })
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
        return res.status(401).json({ message: 'Token mal formatado' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (payload.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso permitido apenas para admin' })
        }
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
}