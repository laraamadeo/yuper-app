const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { handleErrors } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { email, password } = req.body
    return authenticateUser(email, password)
        .then(userId => {
            const payload = { sub: userId }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

            res.status(200).json(token)
        })
})