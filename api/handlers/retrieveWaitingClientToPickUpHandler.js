const { retrieveToken } = require('../helpers')
const { retrieveWaitingClientToPickUp } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveWaitingClientToPickUp(userId)
        .then(meals => res.status(200).json(meals))

})