const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Updates the data of a meal
 * @param {string} userId user's id
 * @param {string} mealId meal's id
 * @param {string[]} images post's images
 * @param {string} title post's images
 * @param {string} description post's images
 * @param {string[]} ingredients post's images
 * @param {string[]} categories post's images
 * @param {number} bestBefore post's images
 * @param {number} quantity post's images
 * @param {number} price post's images
 */
module.exports = function updateMeal(userId, mealId, images, title, description, categories, ingredients, bestBefore, price) {

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)
        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)

        if (meal.author.toString() !== userId) throw new AuthError(`Meal does not belong to user with id ${userId}`)

        await Meal.updateOne({ _id: mealId }, {
            images,
            title,
            description,
            categories,
            ingredients,
            bestBefore,
            price
        })
    })()
}