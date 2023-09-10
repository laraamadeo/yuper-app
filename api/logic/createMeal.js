const { errors: { ExistanceError, AuthError } } = require('../../com')
const { validateText } = require('../../com/validators')
const { User, Meal } = require('../data/models')

/**
 * Creates a meal in db
 * @param {string} userId user's id
 * @param {string[]} images post's images
 * @param {string} title post's images
 * @param {string} description post's images
 * @param {string[]} ingredients post's images
 * @param {string[]} categories post's images
 * @param {number} bestBefore post's images
 * @param {number} quantity post's images
 * @param {number} price post's images
 */

module.exports = function createMeal(userId, images, title, description, ingredients, categories, bestBefore, quantity, price) {
    validateText(description)
    validateText(title)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.create({
            author: userId,
            images,
            title,
            description,
            ingredients,
            categories,
            quantity,
            bestBefore,
            price
        })

        return meal._id
    })()
}
