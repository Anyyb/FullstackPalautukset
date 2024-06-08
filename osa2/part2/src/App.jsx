import { useState, useEffect } from 'react'
import server from './services/server'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

   {/* moduuli server käsittelee yhteyden palvelimella axios.get:llä ja postilla.
     App komponentti käytetään moduulia tietojen lisäämiseen ja hakemiseen palvelimelta ja palvelimelle. */}
   
  useEffect(() => {
    console.log('effect')
    server
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  {/* Tapahtumankäsittelijä lomakkeen käsittelylle,
   jotta molemmat muutokset ppäivittyvät persons tilan listaan samalla formilla. */}
  const handleSubmit = (event) => {
    addNewName(event)
    addNewNumber(event)
  }

 {/* Tapahtumankäsittelijät lomakkeen uuden nimen käsittelylle ja numeron,
   jotta muutokset päivittyvät persons tilan listaan. */}
  const handleName = (event) => {
    console.log('Uusi nimi ja numero käsitelty')
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    console.log('Uusi nimi ja numero käsitelty')
    setNewNumber(event.target.value)
  }

 {/* Nimen lisäyksen tapahtumankäsittelijä */}
  const addNewName= (event) => {
    {/* Lomakkeen oletusarvoinen toiminta estetty */}
    event.preventDefault()
    console.log('Uusi nimi lisätty')
    const names = {
     name: newName,
     number: ''}
    const check = persons.find(({ name }) => name === newName)
    console.log(check)
    if(check){
      alert(`${newName} löytyy jo listalta`)
    } else {
      server
        .addNewName(names)
        .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        
    })
    setNewName('')
  }
}
 {/* Numeron lisäyksen tapahtumankäsittelijä */}
  const addNewNumber = (event) => {
    event.preventDefault();
    console.log('Uusi numero lisätty')
    const numbers = {
     name: newName,
     number: newNumber }
    const check = persons.find(({ number }) => number === newNumber)
    console.log(check)
    if (check) {
      alert(`${newNumber} löytyy jo listalta`)
    } else {
      server
        .addNewNumber(numbers)
        .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        
    })
    setNewName('')
    setNewNumber('')
  }
}

{/* Henkilön poistamisen tapahtumankäsittelijäfunktio */}
const deletePerson = (id) => {
{/* kommunikointi palvelimen kanssa tapahtuu erillisen server.js moduulin kautta */}
  server
    .deleteNameandNumber(id)
    .then(response => {
      console.log('Deleted:', response.data);
      setPersons(persons.filter(person => person.id !== id))
     {/* poisto tapahtuu id:n perusteella ja lisäämme kyseisen id:n muuttujaan findName
      lause etsii oikean nimen poistettavan id:n mukaan ja sitä käytetään confirm lauseessa. */}
      const findName= (persons.find(person => person.id === id))
      if (window.confirm(`Delete ${findName.name}?`)) {
        alert("Person removed from phonebook")
      }
    })
    .catch(error => {
      console.error("Error dataa poistettaessa", error)
})
console.log('henkilö poistettu')
}

{/* Käsittelee suoritettavan haun ja päivittää sen search tilaan */}
const handleSearch = (event) => {
  const query = event.target.value
  setSearch(query)
}
{/* muuttuja peopleToSow tallettaa näytettävien nimien listan search tilaan,
  riippuen suoritetusta haun tuloksesta.*/}
const peopleToShow = search
  ? persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase()))
  : persons


  return (
    <div>
      
      <h2>Phonebook</h2>
      <SearchField search={handleSearch} />
      <Formfield handleSubmit={handleSubmit} newName={newName}
      handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h2>Numbers</h2>
      <PhonebookList peopleToShow={peopleToShow}deletePerson={deletePerson}/>
    </div>
  )
}

 {/* Refaktoroidut komponentit renderöimistä varten */}

const SearchField = (props) => {
  return (
    <div>
      <div>
      Search: <input onChange={props.search} />
      </div>  
    </div>
  )
}
const Formfield = (props) => {
  return (
    <div>
       {/* Lomakkeen onSubmit saa tapahtumankäsittelijän nimen ja numeron lisäykselle */}
      {/* Value saa oletusarvokseen newNamen eli input kentän oletusarvo */}
      {/* onChange saa tapahtumankäsittelijän syötteen käsittelylle */}
      <form onSubmit={props.handleSubmit}>
        <div>
        name: <input 
        value={props.newName}
        onChange={props.handleName} 
        />
        <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumber} 
        />
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
const PhonebookList = (props) => {
  return (
    <div>
      {/*Käytetään map metodia persons listalla uuden nimen näkymän näyttämiseen.
       Nimi toimii uniikkina Id:nä. */}
      <ul>
      {props.peopleToShow.map(person => (
      <li key={person.name}>{person.name}: {person.number}: 
       <button onClick={() => props.deletePerson(person.id)}>Delete</button>
      </li>
      ))}
    </ul>
    </div>
  )
}
export default App