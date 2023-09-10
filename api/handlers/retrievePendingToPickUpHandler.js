const { retrieveToken } = require('../helpers')
const { retrievePendingToPickUp } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrievePendingToPickUp(userId)
        .then(meals => res.status(200).json(meals))

})