const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { deleteMeal } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('deleteMeal', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    })

    let user
    let meal

    beforeEach(async () => {
        await cleanUp()

        user = await User.create({ email: 'test@example.com', password: 'testpass', name: 'exampleName', username: 'exampleUsername' })
        meal = await Meal.create({
            author: user._id,
            title: 'Test Meal',
            description: 'A delicious test meal',
            ingredients: ['ingredient1', 'ingredient2'],
            categories: ['category1', 'category2'],
            bestBefore: new Date(),
            quantity: 2,
            price: 10,
        })
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should delete a meal for a valid user', async () => {
        await deleteMeal(user._id.toString(), meal._id)

        const deletedMeal = await Meal.findById(meal._id)
        expect(deletedMeal).to.be.null
    })

    it('should throw an error when user is not the author', async () => {
        const anotherUser = await User.create({ email: 'another@example.com', password: 'anotherpass', name: 'exampleName', username: 'exampleUsername' })

        try {
            await deleteMeal(anotherUser._id, meal._id)
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.include(`Meal with id ${meal._id} and author id ${user._id} does not belong to user with id ${anotherUser._id}`)
        }
    })

    it('should throw an error for a non-existing meal', async () => {
        const nonExistingMealId = new mongoose.Types.ObjectId()

        try {
            await deleteMeal(user._id, nonExistingMealId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`Meal with id ${nonExistingMealId} not found`)
        }
    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()

        try {
            await deleteMeal(nonExistingUserId, meal._id)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId} not found`)
        }
    })
})