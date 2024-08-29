const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//haetaan blogi collectionin tiedot, async/await funktio
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  //blogin lisäys async/await funktio
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const savedBlog= await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  })
  //blogin poisto async/await funktio
  blogsRouter.delete('/:id', async (request, response) => {
    const deleteBlog= await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    console.log("deleted:", deleteBlog )
    
  })

  module.exports = blogsRouter