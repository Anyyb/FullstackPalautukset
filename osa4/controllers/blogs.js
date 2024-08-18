const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//haetaan blogi collectionin tiedot, async/await funktio
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  //blogin lisäys async/await funktio
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog= await blog.save()
    response.status(201).json(savedBlog)
  })
  //blogin poisto async/await funktio
  blogsRouter.delete('/:id', async (request, response) => {
    const deleteBlog= await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    console.log("deleted:", deleteBlog )
    
  })

  module.exports = blogsRouter