require('dotenv').config()

//portti .env tiedostosta
const PORT = process.env.PORT

//mongodb tietokannan osoite
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
    PORT
  }