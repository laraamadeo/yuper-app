const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveLikedChefs } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveLikedChefs', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    let user;

    beforeEach(async () => {
        user = generateUser();
        await cleanUp();
    });

    after(async () => {
        await mongoose.disconnect();
    });

    it('should retrieve liked chefs for a valid user ID', async () => {
        const chef = await User.create(user);
        const meal = await Meal.create(generateMeal());
        meal.author = chef._id;
        await meal.save();

        // Create a user and add the chef to their likedChefs
        const userWithLikedChef = await User.create(generateUser());
        userWithLikedChef.likedChefs.push(chef._id)
        await userWithLikedChef.save()


        const likedChefs = await retrieveLikedChefs(userWithLikedChef._id.toString());

        expect(likedChefs).to.be.an('array');
        expect(likedChefs).to.have.lengthOf(1);
        expect(likedChefs[0]).to.be.an('object');
        expect(likedChefs[0]._id.toString()).to.equal(chef._id.toString());
        expect(likedChefs[0].username).to.equal(chef.username);
    });

    it('should throw an ExistanceError for an invalid user ID', async () => {
        const invalidUserId = '64f46e271979a1c58e845f8a';
        try {
            await retrieveLikedChefs(invalidUserId);
        } catch (error) {
            expect(error).to.be.an.instanceOf(ExistanceError);
            expect(error.message).to.equal(`User with id ${invalidUserId} not found`);
        }
    });
});