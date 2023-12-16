const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const Blog = require('../src/models/blog')
const User = require('../src/models/user')

const api = supertest(app)

const initBlogs = [
  {
    title: "Mene menninkäinen",
    author: "Menni käinen",
    url: "http://www.menninkäisiäeioleolemassa.com",
    likes: 10 
  },
  {
    title: "kipu luo tuskaa",
    author: "Kukaan koskaan",
    url: "http://www.kivutta.com",
    likes: 12
  },
  {
    title: "Mitä missä milloinkin",
    author: "Miss Millon",
    url: "http://www.missäoot.com",
    likes: 5
  },
  {
    title: "Ei jaksa keksii",
    author: "Kukaan koskaan",
    url: "http://www.eiainakeksii",
    likes: 1
  },
  {
    title: "Hujan hajan hajalla",
    author: "Miss Millon",
    url: "http://www.hajahuja.com",
    likes: 10
  }
]

const blogNoLike = {title: "Ei tykkää, ku ei liketa", author: "Kukaan koskaan", url: "http://www.nopenope.com", likes: null}

const blogNoTitleUrl = {title: undefined, author: "Who the foo", url: undefined, likes: 32}

const getLogin = async (user) => {
  console.log(`userii: ${user}`)
  let tok = await api.post('/api/login')
    .send({username: user.username, password: 'Salapassu'})
  console.log(`Tokeni haettu: ${tok.text}`)
  tok = JSON.parse(tok.text)
  const token = "Bearer ".concat(tok.token)
  return token
}

beforeEach(async () => {
  const useUser = await User.findOne({})
  
  await Blog.deleteMany({})
  console.log(`kannan alustus`)
  const addInits = initBlogs.map(blog => {
    return new Blog({...blog, user: useUser.id})
  })
  const promiseArr = addInits.map(blog => blog.save())
  await Promise.all(promiseArr)
})

test('get all blogs, check json', async () => {
  await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('check id field', async () => {
  const resp = await api.get('/api/blogs')
  const isID = resp.body.map(blog => blog.id)

  expect(isID).toBeDefined()
})

test('adding blog to db', async () => {
  const user = await User.findOne({})
  const token = await getLogin(user)
  console.log(`tokeni addissa: ${token}`)

  console.log(`Adding test token; ${JSON.stringify(token)}`)

  const newBlog = await api.post('/api/blogs')
    .set({Authorization: token})
    .send({title: "new titled site", author: "newton newer", url: "http://www.newnewnew.com", likes: 3})
  const resp = await api.get('/api/blogs')
  expect(resp.body.length).toBe(initBlogs.length + 1)
})

test('likes without value', async () => {
  const user = await User.findOne({})
  const token = await getLogin(user)
  await api.post('/api/blogs')
    .send(blogNoLike)
    .set({Authorization: token})
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const resp = await api.get('/api/blogs')
  expect(resp.body[5].likes).toBe(0)
})

test('title or url without value', async () => {
  const user = await User.findOne({})
  const token = await getLogin(user)
  await api.post('/api/blogs')
    .send(blogNoTitleUrl)
    .set({Authorization: token})
    .expect(400)
})

test('deletin blog post', async () => {
  const user = await User.findOne({})
  const token = await getLogin(user)
  const blogs = await api.get('/api/blogs')
  expect(blogs)
  const blogToDel = JSON.parse(blogs.text)
  console.log(`MIkä del: ${typeof blogToDel} `)
  await api.delete(`/api/blogs/${blogToDel[0].id}`)
    .set({Authorization: token})
    .expect(204)
  const checkBlogs = await api.get('/api/blogs')
  console.log(`check again: ${checkBlogs[0]}`)
  expect(checkBlogs).not.toContain(blogToDel)
})

test('Updating blog likes', async () => {
  const blogs = await api.get('/api/blogs')
  console.log(`eka: ${JSON.stringify(blogs.body[0])}`)
  const retuned = await api.put(`/api/blogs/${blogs.body[0].id}`)
    .send({"likes": 43})
  expect(retuned.body.likes).toBe(43)
})

afterAll(async () => {
  await mongoose.connection.close()
})
