const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if( blog.likes ) {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(error => response.status(400).json({error: error.message}))
  }else {
    const likeBlog = new Blog({...blog, likes: 0})
    likeBlog
      .save()
      .then(res => {
        response.status(201).json(res)
      }).catch(error => response.status(400).json({error: error.message}))
  }
})

module.exports = blogRouter 
