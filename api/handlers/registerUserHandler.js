const { registerUser } = require('../logic')
const { handleErrors } = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = handleErrors((req, res) => {

    const { name, username, email, password } = req.body

    return registerUser(name, username, email, password)
        .then(userId => {
            const payload = { sub: userId }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

            res.status(201).json(token)
        })
})