const { User, Meal } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Returns pending to deliver meals
 * @param {string} userId user's id
 * @returns {object} the founded meals
 */
module.exports = async function retrievePendingToDeliver(userId) {

    const user = await User.findOne({ _id: userId }).populate({
        path: 'selledMeals',
        populate: [
            {
                path: 'meal',
                model: 'Meal'
            },
            {
                path: 'buyer',
                model: 'User'
            }
        ]
    }).lean()

    if (!user) throw new ExistanceError(`User with id ${userId} not found`)
    debugger
    const pendingOrders = user.selledMeals.filter(order => order.status === 'pending')

    const groupedOrders = pendingOrders.reduce((acc, selledMeal) => {
        const existingOrder = acc.find(order => order.serial === selledMeal.serial)

        if (existingOrder) {
            existingOrder.meals.push({ meal: selledMeal.meal, quantity: selledMeal.quantity })
        } else {
            acc.push({
                serial: selledMeal.serial,
                meals: [{ meal: selledMeal.meal, quantity: selledMeal.quantity }],
                buyer: selledMeal.buyer,
                status: selledMeal.status
            })
        }

        return acc
    }, [])

    return groupedOrders
}