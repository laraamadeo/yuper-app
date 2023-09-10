const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveCartMeals } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveCartMeals', () => {
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

    it('should retrieve cart meals for a user', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const cartItem = { meal: userMeal.id, quantity: 2, author: author.id }
        author.cart.push(cartItem)
        await author.save()

        const retrievedMeals = await retrieveCartMeals(author.id)

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)

        const retrievedCartMeal = retrievedMeals[0]
        expect(retrievedCartMeal.author).to.have.property('avatar')
        expect(retrievedCartMeal.author).to.have.property('name')
        expect(retrievedCartMeal.author).to.have.property('username')
        expect(retrievedCartMeal.author).to.have.property('location')
        expect(retrievedCartMeal.author).to.have.property('availability')
        expect(retrievedCartMeal.meals).to.be.an('array')
        expect(retrievedCartMeal.meals).to.have.lengthOf(1)
        expect(retrievedCartMeal.meals[0]).to.have.property('title')
        expect(retrievedCartMeal.meals[0]).to.have.property('quantity', 2)
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrieveCartMeals('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })

    it('should add meal to existing author in mealsMap', async () => {
        const author = await User.create(user)
        const meal1 = await Meal.create(generateMeal())
        await Meal.updateOne({ _id: meal1._id }, { author: author._id })

        const meal2 = await Meal.create(generateMeal())
        await Meal.updateOne({ _id: meal2._id }, { author: author._id })

        const buyer = await User.create(generateUser())
        buyer.cart.push({ meal: meal1._id, quantity: 2, author: author._id })
        buyer.cart.push({ meal: meal2._id, quantity: 2, author: author._id })

        await buyer.save()

        const retrievedMeals = await retrieveCartMeals(buyer._id)

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)

        const retrievedCartMeal = retrievedMeals[0]
        expect(retrievedCartMeal.author).to.have.property('avatar', author.avatar)
        expect(retrievedCartMeal.meals).to.have.lengthOf(2)
        expect(retrievedCartMeal.meals[0]).to.have.property('title')
        expect(retrievedCartMeal.meals[0]).to.have.property('quantity', 2)
    })

    it('should add meal to new author in mealsMap', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const cartItem = { meal: userMeal.id, quantity: 2, author: author.id }
        author.cart.push(cartItem)
        await author.save()

        const mockMealsMap = new Map()

        const retrievedMeals = await retrieveCartMeals(author.id, mockMealsMap)

        expect(retrievedMeals).to.be.an('array')
        expect(retrievedMeals).to.have.lengthOf(1)

        const retrievedCartMeal = retrievedMeals[0]
        expect(retrievedCartMeal.author).to.have.property('avatar')
        expect(retrievedCartMeal.meals).to.have.lengthOf(1)
        expect(retrievedCartMeal.meals[0]).to.have.property('title')
        expect(retrievedCartMeal.meals[0]).to.have.property('quantity', 2)
    })
})