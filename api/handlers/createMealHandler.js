const { createMeal } = require('../logic')
const { handleErrors } = require('../helpers')
const { retrieveToken } = require('../helpers')

module.exports = handleErrors((req, res) => {
    const { images, title, description, ingredients, categories, bestBefore, quantity, price } = req.body

    const userId = retrieveToken(req)

    return createMeal(userId, images, title, description, ingredients, categories, bestBefore, quantity, price)
        .then((id) => res.status(201).json(id))
})