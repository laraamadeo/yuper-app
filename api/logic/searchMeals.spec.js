const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { searchMeals } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('searchMeals', () => {
    before(async () => {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    })

    let user

    beforeEach(async () => {
        user = generateUser()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it('should search and retrieve meals based on title and categories', async () => {
        const author = await User.create(user)

        const meal1Data = generateMeal()
        meal1Data.title = 'Healthy Breakfast'
        meal1Data.categories = ['vegetarian', 'vegan']
        meal1Data.author = author.id
        const meal1 = await Meal.create(meal1Data)

        const meal2Data = generateMeal()
        meal2Data.title = 'Quick Dinner'
        meal2Data.categories = ['vegetarian', 'gluten']
        meal2Data.author = author.id
        const meal2 = await Meal.create(meal2Data)

        const meal3Data = generateMeal()
        meal3Data.title = 'Vegetarian Lunch'
        meal3Data.categories = ['gluten', 'vegetarian']
        meal3Data.author = author.id
        const meal3 = await Meal.create(meal3Data)

        const retrievedMeals = await searchMeals(author.id, 'Healthy', ['vegetarian', 'gluten'])

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)
        expect(retrievedMeals[0].title).to.equal('Healthy Breakfast')
    })

    it('should search and retrieve meals based on title', async () => {
        const author = await User.create(user)

        const meal1Data = generateMeal()
        meal1Data.title = 'Healthy Breakfast'
        meal1Data.categories = ['vegetarian', 'vegan']
        meal1Data.author = author.id
        const meal1 = await Meal.create(meal1Data)

        const meal2Data = generateMeal()
        meal2Data.title = 'Quick Dinner'
        meal2Data.categories = ['vegetarian', 'gluten']
        meal2Data.author = author.id
        const meal2 = await Meal.create(meal2Data)

        const meal3Data = generateMeal()
        meal3Data.title = 'Vegetarian Lunch'
        meal3Data.categories = ['gluten', 'vegetarian']
        meal3Data.author = author.id
        const meal3 = await Meal.create(meal3Data)
        const title = 'quic'
        const retrievedMeals = await searchMeals(author.id, title, [])

        expect(title).to.exist
        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(2)
        expect(retrievedMeals[0].title).to.equal('Quick Dinner')
    })

    it('should return null with undefined as title and no categories', async () => {
        const author = await User.create(user)

        const meal1Data = generateMeal()
        meal1Data.title = 'Healthy Breakfast'
        meal1Data.categories = ['vegetarian', 'vegan']
        meal1Data.author = author.id
        const meal1 = await Meal.create(meal1Data)

        const meal2Data = generateMeal()
        meal2Data.title = 'Quick Dinner'
        meal2Data.categories = ['vegetarian', 'gluten']
        meal2Data.author = author.id
        const meal2 = await Meal.create(meal2Data)

        const meal3Data = generateMeal()
        meal3Data.title = 'Vegetarian Lunch'
        meal3Data.categories = ['gluten', 'vegetarian']
        meal3Data.author = author.id
        const meal3 = await Meal.create(meal3Data)

        const retrievedMeals = await searchMeals(author.id, undefined, [])

        expect(retrievedMeals).to.be.null

    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await searchMeals('64d11134419560441d3b305a', 'Quick', [])
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})