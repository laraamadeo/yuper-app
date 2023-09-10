const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { markAsCompleted } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal, ChefOrder, Order } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('markAsCompleted function', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should mark an order and related chef meal as complete', async () => {
        const chef = await User.create(generateUser())
        const buyer = await User.create(generateUser())

        const meal = await Meal.create(generateMeal())

        const chefOrder = new ChefOrder({
            meal: meal._id,
            quantity: 2,
            author: chef._id,
            buyer: buyer._id,
            serial: '12345',
            status: 'ready'
        })

        chef.selledMeals.push(chefOrder)
        buyer.order.push(new Order({
            items: [{ meal: meal._id, quantity: 2, author: chef._id }],
            serial: '12345',
            status: 'ready',
        }))

        await chef.save()
        await buyer.save()

        await markAsCompleted(buyer._id.toString(), '12345', chef._id.toString())

        const updatedChef = await User.findById(chef._id)
        const updatedBuyer = await User.findById(buyer._id)

        expect(updatedBuyer.order[0].status).to.equal('complete')
        expect(updatedChef.selledMeals[0].status).to.equal('complete')
    })

    it('should not mark as complete if order status is not ready', async () => {
        const chef = await User.create(generateUser())
        const buyer = await User.create(generateUser())

        const meal = await Meal.create(generateMeal())

        const chefOrder = new ChefOrder({
            meal: meal._id,
            quantity: 2,
            author: chef._id,
            buyer: buyer._id,
            serial: '12345',
            status: 'pending'
        })

        chef.selledMeals.push(chefOrder)
        buyer.order.push(new Order({
            items: [{ meal: meal._id, quantity: 2, author: chef._id }],
            serial: '12345',
            status: 'pending'
        }))

        await chef.save()
        await buyer.save()

        await markAsCompleted(buyer._id.toString(), '12345', chef._id.toString())

        const updatedChef = await User.findById(chef._id)
        const updatedBuyer = await User.findById(buyer._id)

        expect(updatedBuyer.order[0].status).to.equal('pending')
        expect(updatedChef.selledMeals[0].status).to.equal('complete')
    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()
        const chef = await User.create(generateUser())

        try {
            await markAsCompleted(nonExistingUserId.toString(), '12345', chef._id.toString())
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId}`)
        }
    })
})