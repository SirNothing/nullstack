const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const conf = require('./utils/conf')

mongoose.set('strictQuery', false)
mongoose.connect(conf.DBURL)
  .then(() => {
    console.log(`connected to mongodb `)
  }).catch(error => console.log(`mongo connect error: ${error.message}`))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
