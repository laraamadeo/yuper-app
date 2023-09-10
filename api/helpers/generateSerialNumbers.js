module.exports = function generateSerialNumber() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    const serialLength = 16

    let randomSerial = ""

    let randomNumber

    for (i = 0; i < serialLength; i = i + 1) {

        randomNumber = Math.floor(Math.random() * chars.length);

        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }

    return randomSerial
}