const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { authenticateUser } = require('../logic')
const { cleanUp, generateUser } = require('../helpers/tests')

const { User } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        await cleanUp()
        user = generateUser()
        await User.create(user)
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should authenticate a user with correct credentials', async () => {
        const userId = await authenticateUser(user.email, user.password)
        expect(userId).to.exist
    })

    it('should throw an error for non-existing email', async () => {
        try {
            await authenticateUser('nonexistent@example.com', user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.equal('User with email nonexistent@example.com not found')
        }
    })

    it('should throw an error for incorrect password', async () => {
        try {
            await authenticateUser(user.email, 'wrongpassword')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('Email or password incorrect')
        }
    })
})