const mongoose = require('mongoose') // otetaan mongoose käyttöön.

//tarkistetaan onko komentoriville annettu salasanaa
if (process.argv.length<3) {
  console.log('give password as argument') // tulostuslause, jos salsanaa ei ole annettu.
  process.exit(1) //lopetetaan suoritus, jos salasanaa ei annettu
}
//kometoriviparametrit järjestyksessä ideksistä 2 lähtien.
//ensimmäiset komentoriviparametrit ovat node ja mongo.js, joten aloitetaan tarkistus 2
const password = process.argv[2] //salasana toinen annettu parametri
const insertAuthor = process.argv[3] // kirjailija kolmas annettu parametri
const insertTitle = process.argv[4] // blogin otsikko neljäs annettu parametri
const insertUrl = process.argv[5] // url osoite viides annettu parametri
const insertLikes = process.argv[6] // tykkäykset kuudes annettu parametri

//asetetaan oisoite tietokantaan, tietokannan connect osoitteella
const url = `mongodb+srv://admin:${password}@testi.whlgs.mongodb.net/?retryWrites=true&w=majority&appName=testi`
//tallennetaan tietokantaan vain määritellyt queryt
mongoose.set('strictQuery', true)
//yhdistetään tietokantaan
mongoose.connect(url)

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
 //määritellään mihin collectioniin tiedot tallennetaan
const Blog = mongoose.model('Blogs', blogSchema)
//asetetaan komentoriviparametrina saadut tiedot tietokannan collectionin schemaan.
const blog = new Blog({
   author: insertAuthor,
    title:insertTitle,
    url:insertUrl,
    likes:insertLikes
  })
  //jos nimi ja numero on annettu lisätään uusi henkilö, jos ei haetaan ja näytetään tietokannassa olevat tiedot.
  if(insertAuthor && insertTitle && insertUrl && insertLikes )
    blog.save().then(() => {
      console.log('blog saved!')
      console.log('Added',blog)
      mongoose.connection.close()
    })
  else {
    Blog.find({}).then(result => {
      result.forEach(blog => {
        console.log(blog)
      })
      mongoose.connection.close()
  
    })}