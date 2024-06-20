const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
    },
    {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
    },
    {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
    },
    {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
    },
]
//etusivu eli sovelluksen juureen tehtävät pyynnöt
app.get('/',(request, response) => {
  response.send('<h1>Front Page</h1>')
})
// http get pyynnöt polkuun persons
app.get('/api/persons',(request, response) => {
  response.json(persons)
})
// pyynnöt polkuun info
app.get('/info',(request, response) => {
  const contacts= persons.length
  response.send(`<h3>Phonebook has info for ${contacts} people <br> ${new Date()} </h3>`)
})
//yhden henkilön tietojen näyttämisen, pyynnöt polkuun api/henkilöt/henkilönID
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  //lähetetään palvelimelle vastauksena tiedot jos henkilön ID on olemassa.
  //muutoin palautetaan statuskoodi 404 not found
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
// numeron poiston pyyntö polkuun api/henkilöt/henkilönNumero
app.delete('/api/persons/:number', (request, response) => {
  const number = Number(request.params.number)
  persons = persons.filter(person => person.number !== number)
  //statuskoodi no content
  response.status(204).end()
})
//portti .env tiedostosta tai käytetään 3001
const PORT = process.env.PORT || 3001;
//lisätty osoitteet konsoliin helpompaa sivujen seurantaa varten.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}/api/persons`);
  console.log(`Server is running on http://localhost:${PORT}/info`);
  console.log(`Server is running on http://localhost:${PORT}/api/persons/4`);
});