const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', async (request, response, next) => {
  const blog = request.body
  const user = await User.findById(blog.user)
  console.log(`posted: ${JSON.stringify(blog)}`)
  console.log(`found user: ${user}`)
  if( blog.likes ) {
    try{
      saveBlog = new Blog({...blog, user: user._id})
      const result = await saveBlog.save()
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
      const likeBlog = new Blog({...blog, likes: 0, user: user._id})
      const saved = await likeBlog.save()
      user.blogs = user.blogs.concat(saved._id)
      await user.save()

      response.status(201).json(saved.body)
    }catch(error) {
      next(error)
    }
  }
})

blogRouter.delete('/:id', async (req, resp, next) => {
  try {
    const toDelete = req.params.id
    await Blog.findByIdAndDelete(toDelete)
    resp.status(204).end()
  }catch(error) {
    next(error)
  }
})

blogRouter.put(`/:id`, async (req, res, next) => {
  try {
    console.log(`body put: ${JSON.stringify(req.body)}`)
    const updateBlog = await Blog.findById(req.params.id)
    const updated = { title: updateBlog.title, author: updateBlog.author, url: updateBlog.url, likes: req.body.likes }
    const returne = await Blog.findByIdAndUpdate(req.params.id, updated, { new: true })
    res.status(203).json(returne)
  }catch(error) { next(error) }
  
})

module.exports = blogRouter 
