const { User, Meal, Item } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Increments meal in cart replacing quantity for the quantity given
 * @param {string} userId user's id
 * @param {string} mealId meal's id
 * @param {number}  quantity post's cart quantity
 */

module.exports = function incrementMealsInCart(userId, mealId, quantity) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)

        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)

        const existingItem = user.cart.find(item => item.meal.toString() === mealId)

        if (existingItem) {
            existingItem.quantity = quantity
        } else {
            const mealInUserCart = new Item({
                meal: mealId,
                author: meal.author,
                quantity
            })
            user.cart.push(mealInUserCart)
        }
        await user.save()
    })()
}