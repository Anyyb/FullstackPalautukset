import { useState, useEffect } from 'react'
import server from './services/server'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

  {/* Tapahtumankäsittelijä lomakkeen käsittelylle*/}
  const handleSubmit = (event) => {
    addNewPerson(event)
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

 {/* Henkilön lisäyksen tapahtumankäsittelijä ja henkilön numeron päivitys*/}
  const addNewPerson= (event) => {
    {/* Lomakkeen oletusarvoinen toiminta estetty */}
    event.preventDefault()
    console.log('Uusi nimi lisätty')
    //alustetaan names objekti ja annetaan sille alustava tieto nimi: newName ja numero: newNumber
    const names = {
     name: newName,
     number: newNumber
    }
    if(newName.length<3){
      setErrorMessage(`Name is too short. Name must have 3 or more letters.`)
      setTimeout(() => {
      setErrorMessage(null)
      }, 4000)
    }
    //tarkistetaan, että numero on oikeassa muodossa ja annetaan errori käyttäjälle.
    if (!newNumber.match(/^\d{3}-\d{5,}$/)) {
      setErrorMessage(`Error, number must be in the correct format: XXX-XXXXX`);
      setTimeout(() => {
      setErrorMessage(null)
      }, 4000)
    }
    //etsitään henkilöä nimen perusteella ja verrataan uuteen nimeen.
    const check = persons.find(({ name }) => name === newName)
    console.log(check)
    //jos nimi löytyy jo, kysytään haluaako käyttäjä päivittää numeron.
    if(check){
      if (window.confirm(`${check.name} already in the phonebook. Do you want to update the number to ${newNumber}?`)) {
      {
    //kommunikoidaan palvelimen kanssa server.js avulla käyttäen updateNumber PUT metodia tiedon päivittämiseen
      server
          .updateNumber(check.id, newName , newNumber)
          .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== check.id ? person: response.data))
          setErrorMessage(`Updated existing person ${check.name}'s number to ${newNumber}.`)
          setTimeout(() => {
          setErrorMessage(null)
          }, 4000)
      })
        .catch(error => {
         console.error('virhe numeroa päivittäessä')
        })
    }
  }
  // jos henkilöä ei ollut jo olemassa lisätään henkilö
  } else {
    server
      .addNewPerson(names)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
      setErrorMessage(`${newName} added to the phonebook.`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    })
}
}
{/* Henkilön poistamisen tapahtumankäsittelijäfunktio */}
const deletePerson = (id) => {
{/* poisto tapahtuu id:n perusteella ja lisäämme kyseisen id:n muuttujaan findName
    lause etsii oikean nimen poistettavan id:n mukaan ja sitä käytetään confirm lauseessa. */}
const findName= (persons.find(person => person.id === id))
if (window.confirm(`Delete ${findName.name}?`)) {
{/* kommunikointi palvelimen kanssa tapahtuu erillisen server.js moduulin kautta */}
  server
    .deleteNameandNumber(id)
    .then(response => {
      console.log('Deleted:', response.data);
      setPersons(persons.filter(person => person.id !== id))
        setErrorMessage(`${findName.name} removed from phonebook.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
    })
    .catch(error => {
      console.error("Error dataa poistettaessa", error)
})
console.log('henkilö poistettu')
} else {
  console.log(`henkikön poisto ${findName.name} peruutettu.`);
}}

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
      <Notification message={errorMessage} />
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
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
export default App