const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { markAsReady } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal, ChefOrder, Order } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('markAsReady function', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should mark a meal as ready and update related orders', async () => {
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
            status: 'pending',
        }))

        await chef.save()
        await buyer.save()

        await markAsReady(chef._id.toString(), '12345')

        const updatedChef = await User.findById(chef._id)
        const updatedBuyer = await User.findById(buyer._id)

        expect(updatedChef.selledMeals[0].status).to.equal('ready')
        expect(updatedBuyer.order[0].status).to.equal('ready')
    })

    it('should not mark as ready if meal serial or status does not match', async () => {
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

        await markAsReady(chef._id.toString(), '67890')

        const updatedChef = await User.findById(chef._id)
        const updatedBuyer = await User.findById(buyer._id)

        expect(updatedChef.selledMeals[0].status).to.equal('pending')
        expect(updatedBuyer.order[0].status).to.equal('pending')
    })

    it('should throw an error for a non-existing chef', async () => {
        const nonExistingChefId = new mongoose.Types.ObjectId()

        try {
            await markAsReady(nonExistingChefId.toString(), '12345')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingChefId}`)
        }
    })
})