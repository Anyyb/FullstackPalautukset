const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/blog_helper')
const api = supertest(app)

// jos tietokannassa on jo yksi käyttäjä
//lisätään kantaan root käyttäjä
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

// testi uuden käyttäjän lisäämiselle
test('new User was added succesfully', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'käyttäjä1',
    name: 'Joku Jokunen',
    password: 'salainen',
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(newUser.username))
})
// testi, jos tietokannassa on jo saman niminen käyttäjä 
test('username is already taken, return proper statuscode', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
// testi, jos salasana ja käyttäjätunnus ei ole vähintään 3 merkkiä pitkä.
test('if username and password is not at least 3 characters long, return proper statuscode', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'ka',
    name: 'Superuser',
    password: 'sa',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('username and password must be 3 or longer'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
// testi, jos salasana tai käyttäjätunnus ei ole olemassa.
test('if username and password does not exists, return proper statuscode', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('content missing'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
after(async () => {
  await mongoose.connection.close()
})