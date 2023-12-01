const express = require('express')
let morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/phone')
const errorHandler = require('./utils/errorHandler')

const app = new express()

app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

morgan.token('extra', (req, res) => {
  if( req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :extra'))


app.get(`/info`, (req, res, next) => {
  const date = new Date()
  Phone.find({}).then(result => {
    res.send(`<html><header></header><body><p> Phonebook has ${result.length} entries <br /> ${date.toString()}`)
  }).catch(error => next(error))
})
app.get("/api/persons", ( request, response, next) => {
  Phone.find({}).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
  console.log(`ID tuli: ${req.params.id}`)
  const id = req.params.id
  Phone.findById(id).then( result => {
    res.json(result)
  }).catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  console.log(`Mika del ID: ${id}`)
  Phone.findByIdAndDelete(id).then(result => {
    res.status(204).end()
  }).catch(error => {
      next(error)
    })
})

app.post(`/api/persons`, (req, res, next) => {
  const addPerson = req.body
  console.log(`Mitä Lisätään: ${JSON.stringify(addPerson)}`)
  newPerson = new Phone({
    name: addPerson.name,
    number: addPerson.number,
  })
  newPerson.save({runValidator: true, context: 'query'}).then(result => {
    console.log(`Added ${result} to database`)
    res.json(result)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const updatePhone = {
    name: body.name,
    number: body.number
  }
  Phone.findByIdAndUpdate(req.params.id, updatePhone, { new: true} )
    .then(result => {
      res.json(result)
    }).catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server runnin on... ${PORT}`)
})
