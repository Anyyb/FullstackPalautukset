const mongoose = require('mongoose')

// määritellään Schema, miten tiedot tallennetaan tietokantaan
const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    minlength: 3,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)