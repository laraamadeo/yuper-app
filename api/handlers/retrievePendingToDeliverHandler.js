const { retrieveToken } = require('../helpers')
const { retrievePendingToDeliver } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrievePendingToDeliver(userId)
        .then(meals => res.status(200).json(meals))

})