const { handleErrors } = require('../helpers')
const { markAsReady } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { serial } = req.body

    const userId = retrieveToken(req)

    return markAsReady(userId, serial)
        .then(() => res.status(204).send())
})