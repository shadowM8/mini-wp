const bcrypt = require(`bcrypt`)
const saltRounds = 10

module.exports = {
    encryptPass: function (pass) {
        return bcrypt.hashSync(pass, saltRounds)
    },
    comparePass: function (passInput, storedInput) {
        return bcrypt.compareSync(passInput, storedInput)
    }
}