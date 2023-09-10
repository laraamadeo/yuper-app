const { User, Meal, Item } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Removes a meal from the cart replacing the quantity or deleting it
 * @param {string} userId user's id
 * @param {string} mealId meal's id
 * @param {number} quantity  meal's quantity
 */
module.exports = function removeMealFromCart(userId, mealId, quantity) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)

        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)

        const existingItem = user.cart.find(item => item.meal.toString() === mealId)

        if (existingItem.quantity <= 1) {
            const index = user.cart.findIndex(item => item.meal.toString() === mealId)

            user.cart.splice(index, 1)
        } else {
            existingItem.quantity = quantity
        }
        await user.save()
    })()
}