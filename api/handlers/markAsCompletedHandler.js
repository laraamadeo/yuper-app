const { handleErrors } = require('../helpers')
const { markAsCompleted } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { serial, chefId } = req.body

    const userId = retrieveToken(req)

    return markAsCompleted(userId, serial, chefId)
        .then(() => res.status(204).send())
})