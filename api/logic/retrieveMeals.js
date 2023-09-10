const { User, Meal } = require('../data/models')
const { errors: { ExistanceError } } = require('../../com')

/**
 * Returns a all meals
 * @param {string} userId user's id
 * @returns {object} the founded meals
 */
module.exports = async function retrieveMeals(userId) {

    const user = await User.findById(userId)

    if (!user) throw new ExistanceError(`User with id ${userId} not found`)

    const meals = await Meal.find().sort('-date').populate('author', '-password -likedChefs -meals -reviews').lean()
    meals.forEach(meal => {

        meal.id = meal._id.toString()

        delete meal._id

        if (meal.author._id) {
            meal.author.id = meal.author._id.toString()
            delete meal.author._id
        }
    })

    const filteredMeals = meals.filter(meal => meal.author.id !== userId)

    return filteredMeals
}

/*    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Meal.find().sort('-date').populate('author', '-password -likedChefs -meals -reviews').lean()
                .then(meals => {
                    meals.forEach(meal => {

                        meal.id = meal._id.toString()

                        delete meal._id

                        if (meal.author._id) {
                            meal.author.id = meal.author._id.toString()
                            delete meal.author._id
                        }
                    })

                    return meals
                })
        })*/