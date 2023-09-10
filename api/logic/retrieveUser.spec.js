const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveUser } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        await cleanUp()

        user = await User.create(generateUser())
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should retrieve a user by ID', async () => {
        const retrievedUser = await retrieveUser(user._id)

        expect(retrievedUser).to.exist
        expect(retrievedUser.username).to.equal(user.username)
        expect(retrievedUser.name).to.equal(user.name)
        expect(retrievedUser.email).to.equal(user.email)
        expect(retrievedUser.description).to.equal(user.description)
        expect(retrievedUser.tags).to.deep.equal(user.tags)
        expect(retrievedUser.avatar).to.equal(user.avatar)
        expect(retrievedUser.availability).to.deep.equal(user.availability)
        expect(retrievedUser.location).to.equal(user.location)
        expect(retrievedUser.likedChefs).to.deep.equal(user.likedChefs)
        expect(retrievedUser.reviews).to.deep.equal(user.reviews)
    })

    it('should throw an error for a non-existent user', async () => {
        const nonExistentUserId = new mongoose.Types.ObjectId()

        try {
            await retrieveUser(nonExistentUserId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.equal(`User with id ${nonExistentUserId} not found`)
        }
    })
})