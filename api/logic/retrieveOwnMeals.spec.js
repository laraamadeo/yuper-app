const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveOwnMeals } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveOwnMeals', () => {
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

    it('should retrieve own meals for a user', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const retrievedMeals = await retrieveOwnMeals(author.id)

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)

        const retrievedMeal = retrievedMeals[0]
        expect(retrievedMeal).to.have.property('id')
        expect(retrievedMeal).to.not.have.property('_id')
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrieveOwnMeals('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})