const { retrieveToken } = require('../helpers')
const { retrieveMeals } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveMeals(userId)
        .then(meals => res.status(200).json(meals))

})