const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveMeals } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveMeals', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generateUser()
    })

    after(async () => {
        await cleanUp()

        await mongoose.disconnect()
    })

    it('should retrieve meals excluding user\'s own meals', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const otherUserMealData = generateMeal()
        otherUserMealData.author = author.id
        const otherUserMeal = await Meal.create(otherUserMealData)

        const retrievedMeals = await retrieveMeals(author.id)

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)

        const retrievedMeal = retrievedMeals[0]
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrieveMeals('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})