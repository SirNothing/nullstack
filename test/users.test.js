const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

describe('One already, Users routes working', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hashword = await bcrypt.hash("Salapassu", 10)
    const newUser = new User({
      username: "Testipeelo",
      name: "Testi pelle",
      password: hashword 
    })
    await newUser.save()
  })

  test('add new user', async () => {
    await api.post('/api/users')
      .send({ username: "Kalle", name: "Pelle kalle", password: "abcdefg" })
    .expect(201)
    .expect('Content-Type', /application\/json/)
    const result = await api.get('/api/users')
    expect(result.body.length).toBe(2)
  })

  test('add existing user', async () => {
    await api.post('/api/users')
      .send( { username: "Testipeelo", name: "Unto kello", password: "Eimee" })
    expect(400)
    const result = await api.get('/api/users')
    expect(result.body.length).toBe(1)
  })

  test('too short password', async () => {
    await api.post('/api/users')
      .send( { username: "Toimiva", name: "Liian lyhyt", password: "kaj" })
    .expect(400)
    const result = await api.get('/api/users')
    expect(result.body.length).toBe(1)
  })

  test('too short username', async () => {
    await api.post('/api/users')
      .send( { username: "Kaj", name: "lyhyt nimi", password: "jeishr" } )
    .expect(400)
    const result = await api.get('/api/users')
    expect(result.body.length).toBe(1)
  })
})
