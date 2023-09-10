const { User, Meal, Item } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')


/**
 * Adds 1 or more meals to cart
 * @param {string} userId user's id
 * @param {string} mealId post's id
 */
module.exports = function addMealToCart(userId, mealId, quantity) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        const meal = await Meal.findById(mealId)

        if (!meal) throw new ExistanceError(`Meal with id ${mealId} not found`)

        const existingItem = user.cart.find(item => item.meal.toString() === mealId)
        debugger
        if (existingItem) {
            if (quantity === undefined) {
                existingItem.quantity += existingItem.quantity + 1
            } else {
                existingItem.quantity += quantity
            }
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