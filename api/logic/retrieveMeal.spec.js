const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveMeal } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveMeal', () => {
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

    it('should retrieve a meal for a valid meal ID', async () => {
        const author = await User.create(user)
        const meal = await Meal.create(generateMeal())
        meal.author = author._id
        await meal.save()

        const retrievedMeal = await retrieveMeal(meal._id.toString())

        expect(retrievedMeal.author).to.be.an('object')

        expect(retrievedMeal.author).to.not.have.property('_id')
        expect(retrievedMeal.author.id).to.be.an('string')

        expect(retrievedMeal).to.be.an('object')
        expect(retrievedMeal.title).to.equal(meal.title)
        expect(retrievedMeal.images).to.deep.equal(meal.images)
        expect(retrievedMeal.description).to.equal(meal.description)
        expect(retrievedMeal.categories).to.deep.equal(meal.categories)
        expect(retrievedMeal.ingredients).to.deep.equal(meal.ingredients)
        expect(retrievedMeal.quantity).to.equal(meal.quantity.toString())
        expect(retrievedMeal.bestBefore).to.equal(meal.bestBefore.toString())
        expect(retrievedMeal.price).to.equal(meal.price.toString())


        //author object
        expect(retrievedMeal.author).to.be.an('object')
        expect(retrievedMeal.author.id).to.equal(author._id.toString())
        expect(retrievedMeal.author.username).to.equal(author.username)
        expect(retrievedMeal.author.name).to.equal(author.name)
        expect(retrievedMeal.author.description).to.equal(author.description)
        expect(retrievedMeal.author.tags).to.deep.equal(author.tags)
        expect(retrievedMeal.author.avatar).to.equal(author.avatar)
        expect(retrievedMeal.author.availability).to.deep.equal(author.availability)
        expect(retrievedMeal.author.location).to.equal(author.location)
        expect(retrievedMeal.author.reviews).to.deep.equal(author.reviews)

    })
})