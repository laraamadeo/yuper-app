const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { createMeal } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('createMeal', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        await cleanUp()
        user = generateUser()
        await User.create(user)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should create a meal for a valid user', async () => {
        const mealData = generateMeal()
        const author = await User.findOne({ email: user.email })

        await createMeal(
            author._id,
            mealData.images,
            mealData.title,
            mealData.description,
            mealData.ingredients,
            mealData.categories,
            mealData.bestBefore,
            mealData.quantity,
            mealData.price
        )

        const createdMeal = await Meal.findOne({ title: mealData.title })
        expect(createdMeal).to.exist
        expect(createdMeal.description).to.equal(mealData.description)
        expect(createdMeal.ingredients).to.deep.equal(mealData.ingredients)
        expect(createdMeal.categories).to.deep.equal(mealData.categories)
        expect(createdMeal.bestBefore).to.equal(mealData.bestBefore.toString())
        expect(createdMeal.quantity).to.equal(mealData.quantity.toString())
        expect(createdMeal.price).to.equal(mealData.price.toString())
    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()
        try {
            const mealData = generateMeal()
            await createMeal(
                nonExistingUserId,
                mealData.images,
                mealData.title,
                mealData.description,
                mealData.ingredients,
                mealData.categories,
                mealData.bestBefore,
                mealData.quantity,
                mealData.price
            )
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId}`)
        }
    })
})