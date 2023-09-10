const { retrieveMeal } = require('../logic')
const { handleErrors } = require('../helpers')


module.exports = handleErrors((req, res) => {
    const { mealId } = req.params

    return retrieveMeal(mealId)
        .then(meal => res.status(200).json(meal))

})