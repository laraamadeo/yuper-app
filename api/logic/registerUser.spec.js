const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { registerUser } = require('../logic')
const { cleanUp, generateUser } = require('../helpers/tests')

const { User } = require('../data/models')

const { errors: { DuplicityError, ContentError } } = require('../../com')

describe('registerUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generateUser()

        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should register a user with valid inputs', async () => {
        const result = await registerUser(
            user.username,
            user.name,
            user.email,
            user.password
        )
        const createdUser = await User.findOne({ email: user.email })

        expect(createdUser).to.exist
        expect(createdUser.name).to.equal(user.name)
        expect(createdUser.email).to.equal(user.email)
        expect(createdUser.password).to.equal(user.password)
    })

    it('should throw an error for an existing email', async () => {
        const existingUser = generateUser()
        existingUser.email = 'existing@example.com'
        await User.create(existingUser)

        try {
            await registerUser(existingUser.username, existingUser.name, existingUser.email, existingUser.password)
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`user with email ${existingUser.email} already exists`)
        }

    })

    it('should throw an error for other creation errors', async () => {
        const invalidUser = generateUser()

        invalidUser.email = null

        try {
            await registerUser(
                invalidUser.username,
                invalidUser.name,
                null,
                invalidUser.password
            )
        } catch (error) {
            expect(error).to.not.be.instanceOf(DuplicityError)
        }
    })

    it('should throw an error for invalid email format', async () => {
        try {
            await registerUser(
                'username',
                'name',
                'invalidemail',
                'validpassword'
            )
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('Invalid email format')
        }
    })

    it('should throw an error for invalid password length', async () => {
        try {
            await registerUser(
                'username',
                'name',
                'test@example.com',
                'short'
            )
        } catch (error) {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('password length lower than 8 characters')
        }
    })

    it('should throw an error for empty text', async () => {
        try {
            await registerUser(
                '',
                'name',
                'test@example.com',
                'validpassword'
            )
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('text is empty')
        }
    })

    it('should throw an error for non-string username', async () => {
        try {
            await registerUser(
                12345,
                'name',
                'test@example.com',
                'validpassword'
            )
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('text is not a string')
        }
    })


    it('should throw an error for non-string name', async () => {
        try {
            await registerUser(
                'username',
                12345,
                'test@example.com',
                'validpassword'
            )
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('name is not a string')
        }
    })
})