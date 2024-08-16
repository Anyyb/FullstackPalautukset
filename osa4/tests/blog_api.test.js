const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../utils/blog_helper')
const api = supertest(app)
const Blog = require('../models/blog')

//alustetaan tietokantanta tyhjäksi ja asetetaan helperissä oleva tieto
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})

// testi, joka tarkistaa onko sen collectionissa 2 blogikirjoitusta. 
// ja löytyykö tietokannasta odotetut blogien kirjoittajat 
//Lopuksi tulostetaan blogit.
test('there are two blogs in test database ', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)

  const blogs = response.body.map(blog => blog.author)
  assert.strictEqual(blogs.includes('Jamie Oliver'), true)
  assert.strictEqual(blogs.includes('Joku ToinenKokki'), true)
  console.log('Blogs:', response.body)

})
// testi, joka tarkistaa, että identifoiva kenttä id on 
// ja verrataan arvot, lopuksi tulostetaan arvot.
test('there is id field and id for blogs in the database ', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => blog.id)
  assert.strictEqual(blogs.includes(blogs[0]), true)
  assert.strictEqual(blogs.includes(blogs[1]), true)
  console.log('Blogs ID :', blogs)
})

// testi uuden blogin lisäämiselle
test('new blog was added succesfully', async () => {

  const newBlog = {
    title: 'Apple Pie',
    author: 'Evil Queen',
    url: 'EvilQueeninsivut',
    likes: 10,
  }
  
//lisätään uusi blogikirjoitus
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(blog => blog.title)
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(title.includes('Apple Pie'),true)
})
after(async () => {
  await mongoose.connection.close()
})
