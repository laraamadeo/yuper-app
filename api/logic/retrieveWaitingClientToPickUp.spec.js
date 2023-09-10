const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveWaitingClientToPickUp } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveWaitingClientToPickUp', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user, meal

    beforeEach(async () => {
        await cleanUp()
        user = new User({
            username: 'testuser',
            name: 'Test User',
            email: 'test@example.com',
            password: 'testpassword',
        })
        await user.save()

        meal = new Meal({
            author: user._id,
            images: ['image1.jpg', 'image2.jpg'],
            title: 'Test Meal',
            description: 'A delicious test meal',
            categories: ['Vegetarian', 'Healthy'],
            ingredients: ['Ingredient 1', 'Ingredient 2'],
        })
        await meal.save()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should retrieve pending waiting orders for a user', async () => {
        const chef = await User.create(generateUser())

        const chefOrder = {
            meal: meal._id,
            quantity: 2,
            author: chef._id,
            buyer: user._id,
            status: 'ready',
            serial: '12345',
        }

        const chefOrder2 = {
            meal: meal._id,
            quantity: 2,
            author: chef._id,
            buyer: user._id,
            status: 'ready',
            serial: '12345',
        }

        user.selledMeals.push(chefOrder)
        user.selledMeals.push(chefOrder2)

        await user.save()

        const retrievedOrders = await retrieveWaitingClientToPickUp(user._id.toString())

        expect(retrievedOrders).to.be.an('array')
        expect(retrievedOrders).to.have.lengthOf(1)

        const retrievedOrder = retrievedOrders[0]
        expect(retrievedOrder).to.have.property('serial', chefOrder.serial)
        expect(retrievedOrder).to.have.property('status', chefOrder.status)
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrieveWaitingClientToPickUp('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})