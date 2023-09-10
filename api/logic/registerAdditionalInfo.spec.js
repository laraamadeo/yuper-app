const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { registerAdditionalInfo } = require('../logic')
const { cleanUp, generateUser } = require('../helpers/tests')

const { User } = require('../data/models')

const { errors: { ExistanceError } } = require('../../com')

describe('registerAdditionalInfo', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let userId

    beforeEach(async () => {
        await cleanUp()
        const newUser = new User({
            username: 'testuser',
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        })

        const savedUser = await newUser.save()
        userId = savedUser._id.toString()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it('should update user additional info', async () => {
        const description = 'Sample description'
        const tags = ['tag1', 'tag2']
        const location = 'Sample location'
        const avatar = 'avatarImage'

        const availability = []

        await registerAdditionalInfo(userId, avatar, description, tags, location, availability)

        const updatedUser = await User.findById(userId)

        expect(updatedUser.description).to.equal(description)
        expect(updatedUser.tags).to.deep.equal(tags)
        expect(updatedUser.location).to.equal(location)

    })

    it('should throw an error when user does not exist', async () => {
        const nonExistentUserId = '6151c81b825b5819b99e9999'

        try {
            await registerAdditionalInfo(nonExistentUserId, 'avatarImage', 'Sample description', ["a,b"], 'Sample location', ["a", "b"])
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.equal(`User with id ${nonExistentUserId} not found`)
        }
    })
})