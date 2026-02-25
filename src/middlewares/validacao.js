export const validarDados = (req, res, next) => {
    const { nome, email, password } = req.body
    if (!nome) return res.status(400).json({ erro: 'Favor inserir o nome' })
    if (!email) return res.status(400).json({ erro: 'Favor inserir o email' })
    if (!password) return res.status(400).json({ erro: 'Favor inserir a senha' })

    next()
}

export const validarAtualizacao = (req, res, next) => {
    const { nome, email } = req.body
    if (!nome) return res.status(400).json({ erro: 'Favor inserir o nome' })
    if (!email) return res.status(400).json({ erro: 'Favor inserir o email' })
    next()
}