const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// haetaan token headerista
//const getTokenFrom = request => {
  //const authorization = request.get('authorization')
  //if (authorization && authorization.startsWith('Bearer ')) {
   // return authorization.replace('Bearer ', '')
  //}
 // return null
//}

//haetaan blogi collectionin tiedot, async/await funktio
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
  //blogin lisäys ja tokenin varmistus pyynnön yhteydessä
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

  //varmistetaan että token on oikea ja palautetaan dekoodattu olio jossa on tieto siitä kuka pyynnön teki
    const decodedToken = jwt.verify(request.token, process.env.SECRET) 

  // jos tokenia ei ole asetettu
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

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