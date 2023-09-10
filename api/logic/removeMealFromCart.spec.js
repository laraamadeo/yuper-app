const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { removeMealFromCart } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('removeMealFromCart', () => {
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

    it('should remove a meal from the cart', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const cartItem = { meal: userMeal.id, quantity: 2, author: author.id }
        author.cart.push(cartItem)
        await author.save()

        await removeMealFromCart(author.id, userMeal.id, 1)

        const updatedUser = await User.findById(author.id).lean()
        expect(updatedUser.cart).to.have.lengthOf(1)
        expect(updatedUser.cart[0].meal.toString()).to.equal(userMeal.id)
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await removeMealFromCart('64d11134419560441d3b305a', 'someMealId', 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })

    it('should throw an error for a non-existing meal', async () => {
        const author = await User.create(user)
        try {
            await removeMealFromCart(author.id, '64d11134419560441d3b305a', 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('Meal with id')
        }
    })

    it('should remove an item completely if quantity is 1', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const cartItem = { meal: userMeal.id, quantity: 1, author: author.id }
        author.cart.push(cartItem)
        await author.save()

        await removeMealFromCart(author.id, userMeal.id, 1)

        const updatedUser = await User.findById(author.id).lean()
        expect(updatedUser.cart).to.have.lengthOf(0)
    })

    it('should decrease quantity if greater than 1', async () => {
        const author = await User.create(user)

        const userMealData = generateMeal()
        userMealData.author = author.id
        const userMeal = await Meal.create(userMealData)

        const cartItem = { meal: userMeal.id, quantity: 3, author: author.id }
        author.cart.push(cartItem)
        await author.save()

        await removeMealFromCart(author.id, userMeal.id, 2)

        const updatedUser = await User.findById(author.id).lean()
        expect(updatedUser.cart[0].quantity).to.equal(2)
    })
})