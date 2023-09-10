const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Deletes a meal from db
 * @param {string} userId user's id
 * @param {string} mealId meal's id
 */
module.exports = function deleteMeal(userId, mealId) {

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)
        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)
        debugger

        if (meal.author.toString() !== userId) throw new AuthError(`Meal with id ${mealId} and author id ${meal.author} does not belong to user with id ${userId}`)

        await Meal.deleteOne({ _id: mealId })
    })()
}