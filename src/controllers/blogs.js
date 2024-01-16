const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', (request, response, next) => {
  try {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  }catch(error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if( !decodedToken.id ) {
    response.status(401).json({message: "invalid or no token" })
  }
  const user = await User.findById(decodedToken.id)

  console.log(`posted: ${JSON.stringify(blog)}`)
  console.log(`found user: ${user}`)
  if( blog.likes ) {
    try{
      let saveBlog = new Blog({...blog, user: user._id})
      let result = await saveBlog.save()
      result = await Blog.populate(saveBlog, { path: 'user' })
      console.log(`haettu blog : ${result}`)
      user.blogs = user.blogs.concat(result._id)
      console.log(`Mika id blog: ${result._id}`)
      await user.save()
      response.status(201).json(result)
    }catch(error) {
      next(error)
    }
  }else {
    try {
      console.log(`blog post no likes ${blog}`)
      const likeBlog = new Blog({...blog, likes: 0, user: user._id})
      let saved = await likeBlog.save()
      saved = await Blog.populate(likeBlog, { path: 'user' })
      user.blogs = user.blogs.concat(saved._id)
      await user.save()
      response.status(201).json(saved)
    }catch(error) {
    next(error)
    }
  }
})

blogRouter.delete('/:id', async (req, resp, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if( !decodedToken.id ) {
    return resp.status(401).json({ error: 'Cant verify token'})
  }
  const user = await User.findById(decodedToken.id)
  try {
    const toDelete = req.params.id
    const blog = await Blog.findById(toDelete)
    if( blog.user._id.toString() === user._id.toString() ) {
      await Blog.findByIdAndDelete(toDelete)
      resp.status(204).end()
    } else {
      resp.status(400).send({ error: 'wrong user'})
    }
  }catch(error) {
    next(error)
  }
})

blogRouter.put(`/:id`, async (req, res, next) => {
  try {
    console.log(`body put: ${JSON.stringify(req.body)}`)
    const updateBlog = await Blog.findById(req.params.id)
    const updated = { title: updateBlog.title, author: updateBlog.author, url: updateBlog.url, likes: req.body.likes }
    let returne = await Blog.findByIdAndUpdate(req.params.id, updated, { new: true }).populate('user')
    res.status(203).json(returne)
  }catch(error) { next(error) }
  
})

module.exports = blogRouter 
