const bcrypt = require('bcrypt')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validestion

    const encryptPasswod = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'senha não informada')
            existsOrError(user.confirmPassword, 'confirmação de senha invalida')
            equalsOrError(user.password, user.confirmPassword, 'senhas não confere')

            const userFromdb = await app.db('users')
                .where({ email: user.email }).first()
            if (user.id) {
                notExistsOrError(userFromdb, 'usuario ja foi cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        user.password = encryptPasswod(user.password)
        delete user.confirmPassword
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        app.db('users')
            .select('id', 'nome', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'nome', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    //APRENDA A IDENTAÇÃO PELO AMOR DE DEUS 

    return { save, get, getById }
}