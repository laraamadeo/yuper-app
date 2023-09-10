const { Types: { ObjectId } } = require('mongoose')

module.exports = () => {
    return {
        id: new ObjectId(),
        username: `username-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: `password-${Math.random()}`,
        description: `description-${Math.random()}`,
        tags: [],
        avatar: `avatar-${Math.random()}`,
        availability: [],
        location: 'No location yet',
        likedChefs: [],
        reviews: [],
        cart: [],
        order: [],
        selledMeals: [],
    }
}
