const { retrieveToken } = require('../helpers')
const { retrieveCartMeals } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveCartMeals(userId)
        .then(meals => res.status(200).json(meals))

})