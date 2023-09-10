const { User, Meal, Item } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Marks an order as completed
 * @param {string} userId user's id
 * @param {string} serial order's serial number
 * @param {string} chefId chef's id
 */
module.exports = function markAsCompleted(userId, serial, chefId) {
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        for (const order of user.order) {
            if (order.serial === serial && order.status === "ready") {
                order.status = "complete"
            }
        }

        const chef = await User.findById(chefId)

        for (const selledMeals of chef.selledMeals) {
            if (selledMeals.serial === serial) {
                selledMeals.status = "complete"
            }
        }
        await user.save()
        await chef.save()
    })()
}