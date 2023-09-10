const { retrieveToken } = require('../helpers')
const { toggleLikeChef } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const userId = retrieveToken(req)
    const { chefId } = req.params

    return toggleLikeChef(userId, chefId)
        .then(() => res.status(200).send())

})