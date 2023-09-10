const { handleErrors } = require('../helpers')
const { payMealsInCart } = require('../logic')
const { retrieveToken } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return payMealsInCart(userId)
        .then(() => res.status(201).send())
})