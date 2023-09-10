const { retrieveToken } = require('../helpers')
const { retrieveLikedChefs } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)

    return retrieveLikedChefs(userId)
        .then(meals => res.status(200).json(meals))

})