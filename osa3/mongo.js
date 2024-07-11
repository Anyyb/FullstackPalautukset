const mongoose = require('mongoose') // otetaan mongoose käyttöön.

//tarkistetaan onko komentoriville annettu salasanaa
if (process.argv.length<3) {
  console.log('give password as argument') // tulostuslause, jos salsanaa ei ole annettu.
  process.exit(1) // lopetetaan suoritus, jos salasanaa ei annettu
}
//kometoriviparametrit järjestyksessä ideksistä 2 lähtien.
//ensimmäiset komentoriviparametrit ovat node ja mongo.js, joten aloitetaan tarkistus 2
const password = process.argv[2] //salasana toinen annettu parametri
const insertName = process.argv[3] // nimi kolmas annettu parametri
const insertNumber = process.argv[4] // numero neljäs annettu parametri

//asetetaan oisoite tietokantaan, tietokannan connect osoitteella
const url = `mongodb+srv://admin:${password}@puhelinkirja.egy0orc.mongodb.net/?retryWrites=true&w=majority&appName=puhelinkirja`
//tallennetaan tietokantaan vain määritellyt queryt
mongoose.set('strictQuery', true)
//yhdistetään tietokantaan
mongoose.connect(url)

// määritellään Schema, miten tiedot tallennetaan tietokantaan
const personSchema = new mongoose.Schema({
  name: String,
  number:String,
})
//määritellään mihin collectioniin tiedot tallennetaan
const Person = mongoose.model('Person', personSchema)

//asetetaan komentoriviparametrina saadut tiedot tietokannan collectionin schemaan.
const person = new Person({
  name: insertName,
  number:insertNumber,
})
//jos nimi ja numero on annettu lisätään uusi henkilö, jos ei haetaan ja näytetään tietokannassa olevat tiedot.
if(insertName && insertNumber)
  person.save().then(() => {
    console.log('person saved!')
    console.log('Added',person)
    mongoose.connection.close()
  })
else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()

  })}