const { handleErrors } = require('../helpers')
const { addMealToCart } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { quantity } = req.body

    const { mealId } = req.params

    const userId = retrieveToken(req)

    return addMealToCart(userId, mealId, quantity)
        .then(() => res.status(204).send())
})