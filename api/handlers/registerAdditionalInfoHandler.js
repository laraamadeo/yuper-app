const { registerAdditionalInfo } = require('../logic')
const { handleErrors } = require('../helpers')
const { retrieveToken } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { avatar, description, tags, location, availability } = req.body

    debugger
    const userId = retrieveToken(req)
    return registerAdditionalInfo(userId, avatar, description, tags, location, availability)
        .then(() => res.status(204).send())
})