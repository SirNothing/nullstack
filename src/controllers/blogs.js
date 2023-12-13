const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  console.log`posted: ${JSON.stringify(blog)}`
  if( blog.likes ) {
    try{
      const result = await blog.save()
      response.status(201).json(result.body)
    }catch(error) {
      next(error)
    }
  }else {
    try {
      const likeBlog = new Blog({...blog, likes: 0})
      const saved = await likeBlog.save()
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
