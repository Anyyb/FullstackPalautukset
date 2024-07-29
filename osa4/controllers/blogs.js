const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//haetaan blogi collectionin tiedot
blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(result => {
      response.json(result)
  })
  })
  //blogin lisäys
  blogsRouter.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
    blog.save().then(savedBlog => {
        response.json(savedBlog)
    })
      .catch(error => next(error))
  })

  module.exports = blogsRouter