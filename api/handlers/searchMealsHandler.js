const { retrieveToken } = require('../helpers')
const { searchMeals } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)
    const { title, categories } = req.body

    return searchMeals(userId, title, categories)
        .then(meals => res.status(200).json(meals))

})