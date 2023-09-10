const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { incrementMealsInCart, addMealToCart } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('incrementMealsInCart', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should add a meal to the user cart', async () => {
        const user = await User.create(generateUser())
        const meal = await Meal.create(generateMeal())

        await addMealToCart(user._id.toString(), meal._id.toString(), 3)
        await incrementMealsInCart(user._id.toString(), meal._id.toString(), 3)

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).to.have.lengthOf(1)

        const cartItem = updatedUser.cart[0]
        expect(cartItem.meal.toString()).to.equal(meal._id.toString())
        expect(cartItem.quantity).to.equal(3)
    })

    it('should increase the quantity if the meal already exists in the cart', async () => {
        const user = await User.create(generateUser())
        const meal = await Meal.create(generateMeal())

        await addMealToCart(user._id.toString(), meal._id.toString(), 3)

        await incrementMealsInCart(user._id.toString(), meal._id.toString(), 5)

        const updatedUser = await User.findById(user._id)
        expect(user.cart).to.have.lengthOf(0)

        const cartItem = user.cart[0]

    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()
        const meal = await Meal.create(generateMeal())

        try {
            await incrementMealsInCart(nonExistingUserId.toString(), meal._id.toString(), 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId}`)
        }
    })

    it('should throw an error for a non-existing meal', async () => {
        const user = await User.create(generateUser())
        const nonExistingMealId = new mongoose.Types.ObjectId()

        try {
            await incrementMealsInCart(user._id.toString(), nonExistingMealId.toString(), 1)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`Meal with id ${nonExistingMealId}`)
        }
    })

    it('should add a new meal to the cart if it does not exist', async () => {
        const user = await User.create(generateUser());
        const meal = await Meal.create(generateMeal());

        await incrementMealsInCart(user._id.toString(), meal._id.toString(), 3);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.cart).to.have.lengthOf(1);

        const cartItem = updatedUser.cart[0];
        expect(cartItem.meal.toString()).to.equal(meal._id.toString());
        expect(cartItem.quantity).to.equal(3);
    });


})