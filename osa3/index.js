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
app.get('/',(request, response) => {
  response.send('<h1>Front Page</h1>')
})
app.get('/api/persons',(request, response) => {
  response.json(persons)
})
app.get('/info',(request, response) => {
  const contacts= persons.length
  response.send(`<h3>Phonebook has info for ${contacts} people <br> ${new Date()} </h3>`)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});