const { Types: { ObjectId } } = require('mongoose')


module.exports = () => {
    return {
        id: new ObjectId(),
        author: new ObjectId(),
        images: [`image-${Math.random()}`, `image-${Math.random()}`, `image-${Math.random()}`, `image-${Math.random()}`, `image-${Math.random()}`],
        title: `title-${Math.random()}`,
        description: `description-${Math.random()}`,
        categories: [`cat1-${Math.random()}`, `cat2-${Math.random()}`, `cat3-${Math.random()}`],
        ingredients: [`ing1-${Math.random()}`, `ing2-${Math.random()}`, `ing3-${Math.random()}`],
        quantity: Math.random(),
        bestBefore: Math.random(),
        price: Math.random(),
        date: Date.now()
    }
}
