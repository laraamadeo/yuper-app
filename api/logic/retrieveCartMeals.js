const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Returns meals in cart of a user
 * @param {string} userId user's id
 * @returns {object} an array of meals in cart
 */
module.exports = async function retrieveCartMeals(userId) {

    const user = await User.findById(userId).lean()

    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    const mealsMap = new Map()

    for (const cartItem of user.cart) {
        const meal = await Meal.findById(cartItem.meal).select('-images -description -categories -ingredients -bestBefore -quantity -date -__v').lean()

        meal.quantity = cartItem.quantity

        const author = await User.findById(meal.author).lean()

        const authorId = meal.author.toString()

        if (mealsMap.has(authorId)) {
            mealsMap.get(authorId).meals.push(meal)
        } else {
            mealsMap.set(authorId, {
                author: {
                    avatar: author.avatar,
                    name: author.name,
                    username: author.username,
                    location: author.location,
                    availability: author.availability
                },
                meals: [meal]
            })
        }

    }
    const mealsInCart = Array.from(mealsMap.values())

    return mealsInCart
}

