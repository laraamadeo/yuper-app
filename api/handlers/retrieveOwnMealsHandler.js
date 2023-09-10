const { retrieveToken } = require('../helpers')
const { retrieveOwnMeals } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveOwnMeals(userId)
        .then(meals => res.status(200).json(meals))

})