const { User, Meal, Item } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Marks an order as ready
 * @param {string} userId user's id
 * @param {string} serial order's serial number
 */
module.exports = function markAsReady(userId, serial) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        for (const meal of user.selledMeals) {
            if (meal.serial === serial && meal.status === "pending") {
                meal.status = "ready"

                const buyer = await User.findById(meal.buyer)

                for (const order of buyer.order) {
                    if (order.serial === serial) {
                        order.status = "ready"
                    }
                }
                await buyer.save()
            }
        }

        await user.save()
    })()
}