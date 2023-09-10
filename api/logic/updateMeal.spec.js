const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { updateMeal } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('updateMeal', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user, meal

    beforeEach(async () => {
        user = await User.create(generateUser())
        meal = await Meal.create(generateMeal())
        await Meal.updateOne({ _id: meal._id }, { author: user._id })
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it('should update the meal for the authorized user', async () => {
        const updatedTitle = 'Updated Meal Title'
        const updatedDescription = 'Updated Meal Description'

        await updateMeal(
            user._id.toString(),
            meal._id,
            meal.images,
            updatedTitle,
            updatedDescription,
            meal.categories,
            meal.ingredients,
            meal.bestBefore,
            meal.price
        )

        const updatedMeal = await Meal.findById(meal._id)
        expect(updatedMeal.title).to.equal(updatedTitle)
        expect(updatedMeal.description).to.equal(updatedDescription)
    })

    it('should throw an error if user is not the author of the meal', async () => {
        const otherUser = await User.create(generateUser())

        try {
            await updateMeal(
                otherUser._id,
                meal._id,
                meal.images,
                'Updated Title',
                'Updated Description',
                meal.categories,
                meal.ingredients,
                meal.bestBefore,
                meal.price
            )
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.include(`Meal does not belong to user with id ${otherUser._id}`)
        }
    })

    it('should throw an error if meal does not exist', async () => {
        const nonExistingMealId = new mongoose.Types.ObjectId()

        try {
            await updateMeal(
                user._id,
                nonExistingMealId,
                meal.images,
                'Updated Title',
                'Updated Description',
                meal.categories,
                meal.ingredients,
                meal.bestBefore,
                meal.price
            )
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`Meal with id ${nonExistingMealId} not found`)
        }
    })

    it('should throw an error if user does not exist', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()

        try {
            await updateMeal(
                nonExistingUserId,
                meal._id,
                meal.images,
                'Updated Title',
                'Updated Description',
                meal.categories,
                meal.ingredients,
                meal.bestBefore.toString(),
                meal.price.toString()
            )
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId} not found`)
        }
    })
})