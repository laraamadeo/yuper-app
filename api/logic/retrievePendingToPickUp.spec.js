const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrievePendingToPickUp } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrievePendingToPickUp', () => {
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

    it('should retrieve pending orders for a user', async () => {
        const author = await User.create(user)
        const meal = await Meal.create(generateMeal())

        const buyer = await User.create(generateUser())


        const order = {
            serial: '12345',
            items: [
                {
                    meal: meal._id,
                    quantity: 2,
                    author: meal.author,
                },
                {
                    meal: meal._id,
                    quantity: 2,
                    author: meal.author,
                }
            ],
            status: 'pending',
            date: new Date(),
        }

        buyer.order.push(order)
        await buyer.save()

        const retrievedOrders = await retrievePendingToPickUp(buyer._id.toString())

        expect(retrievedOrders).to.be.an('array')
        expect(retrievedOrders).to.have.lengthOf(1)

        const retrievedOrder = retrievedOrders[0]
        const retrievedMealId = retrievedOrder.items[0].meals[0].meal._id.toString()

        expect(retrievedMealId).to.equal(meal._id.toString())
        expect(retrievedOrder).to.have.property('serial', order.serial)
        expect(retrievedOrder).to.have.property('status', order.status)
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrievePendingToPickUp('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})