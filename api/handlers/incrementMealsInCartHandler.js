const { handleErrors } = require('../helpers')
const { incrementMealsInCart } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {

    const { quantity } = req.body

    const { mealId } = req.params

    const userId = retrieveToken(req)

    return incrementMealsInCart(userId, mealId, quantity)
        .then(() => res.status(204).send())
})