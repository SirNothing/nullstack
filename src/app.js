const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const conf = require('./utils/conf')
const errorHandler = require('./utils/errorHandler')

mongoose.set('strictQuery', false)
mongoose.connect(conf.DBURL)
  .then(() => {
    console.log(`connected to mongodb `)
  }).catch(error => console.log(`mongo connect error: ${error.message}`))

app.use(express.json())
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app
