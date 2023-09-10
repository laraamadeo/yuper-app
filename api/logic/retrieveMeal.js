const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Returns a meal
 * @param {string} meal meal's id
 * @returns {object} the founded meal
 */
module.exports = async function retrieveMeal(mealId) {
    const meal = await Meal.findById(mealId).populate('author', '-password -likedChefs -__v -email').lean()

    meal.id = meal._id.toString()

    delete meal._id

    //if (meal.author._id) {
    meal.author.id = meal.author._id.toString()
    delete meal.author._id

    return meal
}
