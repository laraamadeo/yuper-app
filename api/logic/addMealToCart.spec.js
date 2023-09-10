const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { addMealToCart } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('addMealToCart', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user, meal

    beforeEach(async () => {
        await cleanUp()

        user = await User.create(generateUser())

        meal = new Meal({
            author: user._id,
            images: ['image1.jpg', 'image2.jpg'],
            title: 'Test Meal',
            description: 'A delicious test meal',
            categories: ['Vegetarian', 'Healthy'],
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            quantity: 5,
            price: 10.99,
            bestBefore: '2023-12-31',
        })
        await meal.save()
    })

    afterEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should add a meal to the user cart', async () => {
        await addMealToCart(user._id.toString(), meal._id.toString(), 3)

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).to.have.lengthOf(1)

        const cartItem = updatedUser.cart[0]
        expect(cartItem.meal.toString()).to.equal(meal._id.toString())
        expect(cartItem.quantity).to.equal(3)
    })

    it('should increase the quantity if the meal already exists in the cart', async () => {
        user.cart.push({
            meal: meal._id,
            author: meal.author,
            quantity: 2,
        })
        await user.save()

        await addMealToCart(user._id.toString(), meal._id.toString())

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).to.have.lengthOf(1)

        const cartItem = updatedUser.cart[0]
        expect(cartItem.meal.toString()).to.equal(meal._id.toString())
        expect(cartItem.quantity).to.equal(5)
    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()
        try {
            await addMealToCart(nonExistingUserId.toString(), meal._id.toString(), 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId}`)
        }
    })

    it('should throw an error for a non-existing meal', async () => {
        const nonExistingMealId = new mongoose.Types.ObjectId()
        try {
            await addMealToCart(user._id.toString(), nonExistingMealId.toString(), 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`Meal with id ${nonExistingMealId}`)
        }
    })

    it('should increase quantity by the specified amount for an existing meal', async () => {
        user.cart.push({
            meal: meal._id,
            author: meal.author,
            quantity: 2,
        })
        await user.save()

        const increaseQuantity = 4
        await addMealToCart(user._id.toString(), meal._id.toString(), increaseQuantity)

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).to.have.lengthOf(1)

        const cartItem = updatedUser.cart[0]
        expect(cartItem.meal.toString()).to.equal(meal._id.toString())
        expect(cartItem.quantity).to.equal(2 + increaseQuantity)
    })
})