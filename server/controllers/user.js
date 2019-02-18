const User = require('../models/user')
const { comparePass } = require('../helpers/password')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = "662439114943-dbokhcupmiskkj3m4ducm3ik5kkion35.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)
require('dotenv').config()

module.exports = {
    googleVerify: (req, res) => {
        let payLoad = null
        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID
            })
            .then(ticket => {
                payLoad = ticket.getPayload()
                return User.findOne({
                    email: payLoad.email
                }).lean()
            })
            .then(findOneResult => {
                if (!findOneResult) {
                    return User.create({
                        email: payLoad.email,
                        password: '123google'
                    })
                } else {
                    const token = jwt.sign(findOneResult, process.env.JWT)
                    res.status(200).json({ access_token: token, email : findOneResult.email })
                }
            })
            .then(createResult => {
                const token = jwt.sign(createResult, process.env.JWT)
                res.status(201).json({ access_token: token })
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({ err: err.message })
            })

    },
    register: (req, res) => {
        let newUser = { email, password } = req.body
        console.log(newUser)
        User
            .create(newUser)
            .then(createResult => {
                res.status(201).json(createResult)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    login: (req, res) => {
        User
            .findOne({
                email: req.body.email
            })
            .then(findResult => {
                if (!findResult) res.status(404).json({ msg: `user not found` })
                else {
                    if (comparePass(req.body.password, findResult.password)) {
                        let token = jwt.sign({
                            id: findResult._id,
                            email: findResult.email
                        }, process.env.JWT)
                        res.status(200).json({ access_token: token, id: findResult._id })
                    }
                    else {
                        res.status(400).json({ msg: `incorrect password` })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}