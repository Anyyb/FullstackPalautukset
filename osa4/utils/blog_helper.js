const User = require('../models/user')

const initialBlogs = [
    {
      author: 'Jamie Oliver',
      title: 'Crispy Moroccan carrots',
      url: 'jamieoliverinsivut',
      likes: 5,
    },
    {
      author: 'Joku ToinenKokki',
      title: 'Herkku omenat',
      url: 'jokutoinenkokkisivut',
      likes: 7,
    }
  ]

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports= {
    initialBlogs, 
    usersInDb
    
}