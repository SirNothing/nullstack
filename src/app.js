const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const conf = require('./utils/conf')
const errorHandler = require('./utils/errorHandler')
const tokenExtraction = require('./utils/tokenExtractor')
const userExtractor = require('./utils/userExtractor')

mongoose.set('strictQuery', false)
mongoose.connect(conf.DBURL)
  .then(() => {
    console.log(`connected to mongodb `)
  }).catch(error => console.log(`mongo connect error: ${error.message}`))

app.use(express.json())
app.use(cors())
app.use(tokenExtraction)
app.use(userExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app
