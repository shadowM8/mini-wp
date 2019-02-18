const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encryptPass } = require('../helpers/password')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                return User.findOne({
                    email: email,
                    _id: {
                        $ne: this._id
                    }
                })
                    .then(user => {
                        if (user) throw `Email has been used`
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email format is incorrect'],

    },
    password: {
        type: String,
        required: [true, 'Password must be filled']
    },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Articles' }]
})

userSchema.pre('save', function (next) {
    this.password = encryptPass(this.password)
    next()
})

const User = mongoose.model(`User`, userSchema)

module.exports = User