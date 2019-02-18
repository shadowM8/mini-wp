const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')
const articleRoutes = require('./routes/articles')
const userRoutes = require('./routes/users')

app.use(cors())

const url = `mongodb://localhost:27017/database-mini-wp`
mongoose.connect(url, {useNewUrlParser:true})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/articles/', articleRoutes)
app.use('/users/',userRoutes)

app.listen(port, ()=> {
    console.log(`listening to port ${port}`)
})