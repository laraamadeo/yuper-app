const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { toggleLikeChef } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('toggleLikeChef', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should add chefId to likedChefs array if not already liked', async () => {
        const user = await User.create(generateUser())
        const chef = await User.create(generateUser())

        await toggleLikeChef(user._id.toString(), chef._id.toString())

        const updatedUser = await User.findById(user._id)

        expect(updatedUser).to.exist
        expect(updatedUser.likedChefs).to.be.an('array')
        expect(updatedUser.likedChefs).to.include(chef._id.toString())
    })

    it('should remove chefId from likedChefs array if already liked', async () => {
        const user = await User.create(generateUser())
        const chef = await User.create(generateUser())

        // Add chefId to likedChefs initially
        user.likedChefs.push(chef._id)
        await user.save()

        await toggleLikeChef(user._id.toString(), chef._id.toString())
        await toggleLikeChef(user._id.toString(), chef._id.toString())

        const updatedUser = await User.findById(user._id)

        expect(updatedUser).to.exist
        expect(updatedUser.likedChefs).to.be.an('array')
        expect(updatedUser.likedChefs).to.not.include(chef._id.toString())
    })

    it('should throw ExistanceError if userId is invalid', async () => {
        const chefId = '64f46e271969a4c58e845f8a'

        try {
            await toggleLikeChef('64f46e271979a4c58e845f8a', chefId)
        } catch (error) {
            expect(error).to.be.an.instanceOf(ExistanceError)
            expect(error.message).to.equal(`User with id 64f46e271979a4c58e845f8a not found`)
        }
    })
})