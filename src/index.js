const express = require('express')
let morgan = require('morgan')
const cors = require('cors')

const app = new express()

app.use(cors())
app.use(express.json())

morgan.token('extra', (req, res) => {
  if( req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :extra'))

let listPerson = [
  {
    id: 1,
    name: "Kalle",
    number: "231312421"
  },
  {
    id: 2,
    name: "Hullu nullu",
    number: "3213211"
  },
  {
    id: 3,
    name: "Matruusi von",
    number: "231321"
  },
  {
    id: 4,
    name: "Kulkuri k",
    number: "32131"
  }
]

app.get(`/info`, (req, res) => {
  const date = new Date()
  res.send(`<html><header></header><body><p> Phonebook has ${listPerson.length} entries <br/> ${date.toString()}`)
})
app.get("/api/persons", ( request, response ) => {
  response.send(listPerson)
})

app.get("/api/persons/:id", (req, res) => {
  console.log(`ID tuli: ${req.params.id}`)
  const id = req.params.id
  const person = listPerson.filter(per => per.id === Number(id))
  console.log(`Kuka löyty: ${JSON.stringify(person)}`)
  if( person[0]) {
    res.send(person).status(201)
  }else {
    res.status(404).send({message: "Could not find person"})
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  console.log(`Mika del ID: ${id}`)
  const delPerson = listPerson.filter(per => per.id === Number(id))
  console.log(`mika del person: ${JSON.stringify(delPerson)}`)
  if( delPerson[0] ) {
    listPerson = listPerson.filter(per => per.id !== Number(id))
    console.log(`Mitä jäi listalle dellin jälk: ${JSON.stringify(listPerson)}`)
    res.send(delPerson)
  }else {
    res.status(404).send({message: "No person to delete found"})
  }
})

app.post(`/api/persons`, (req, res) => {
  const addPerson = req.body
  console.log(`Mitä Lisätään: ${JSON.stringify(addPerson)}`)
  const newId = Math.floor(Math.random() * 10000)
  if( listPerson.filter(per => per.name === addPerson.name).length === 0 && addPerson.name && addPerson.number ) {
    listPerson = [ ...listPerson, {...addPerson, id: newId} ]
    res.send(addPerson)
  }else {
    res.status(404).send({message: "Could not add person" })
  }
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server runnin on... ${PORT}`)
})
