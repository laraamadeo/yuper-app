const { User, Meal } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Returns an array of your own meals
 * @param {string} userId user's id
 * @returns {object} the founded meals
 */
module.exports = async function retrieveOwnMeals(userId) {

    const user = await User.findById(userId)

    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    const meals = await Meal.find({ author: userId }).lean()

    meals.forEach(meal => {

        meal.id = meal._id.toString()

        delete meal._id
    })

    return meals
}