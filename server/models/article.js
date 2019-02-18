const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : {
        type : String,
        minlength : [6, `min title length is 6 character`]
    },
    content : String,
    image : String,
    userId : {type : Schema.Types.ObjectId, ref: 'User'}
},{ timestamps: true})


const Article = mongoose.model('Articles',articleSchema)

module.exports = Article