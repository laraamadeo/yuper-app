const { User, Meal } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

module.exports = function toggleLikeChef(userId, chefId) {
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        if (user.likedChefs.length === 0 || !user.likedChefs.includes(chefId)) {
            user.likedChefs.push(chefId)

            user.save()

            return
        } else {
            const index = user.likedChefs.findIndex(id => id.toString() === chefId)

            user.likedChefs.splice(index, 1)

            user.save()

            return
        }
    })()
}