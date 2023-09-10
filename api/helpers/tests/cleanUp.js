const { User, Meal } = require('../../data/models')

module.exports = async function cleanUp() {
    await Promise.all([
        User.deleteMany(),
        Meal.deleteMany(),
    ])
}