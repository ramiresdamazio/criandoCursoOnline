import jwt from 'jsonwebtoken'

export class AuthController {
    async login(req, res) {
        const { email, password } = req.body
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
            return res.status(401).json({ message: 'Credenciais Inválidas' })

        const token = jwt.sign(
            { id: 1, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        )
        res.status(200).json({ token: token })

    }
}
