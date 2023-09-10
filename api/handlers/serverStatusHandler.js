const { handleErrors } = require('../helpers')

module.exports = handleErrors(async (req, res) => {
    return 'Server UP'
})