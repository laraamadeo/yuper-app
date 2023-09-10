const { handleErrors } = require('../helpers')
const { updateMeal } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { images, title, description, categories, ingredients, bestBefore, price } = req.body

    const { mealId } = req.params

    const userId = retrieveToken(req)

    return updateMeal(userId, mealId, images, title, description, categories, ingredients, bestBefore, price)
        .then(() => res.status(204).send())
})