import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(names))
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
      alert(`${newNumber} löytyy jo listalta`);
    } else {
    setPersons(persons.concat(numbers));
    setNewName('')
    setNewNumber('')
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Lomakkeen onSubmit saa tapahtumankäsittelijän nimen ja numeron lisäykselle */}
      {/* Value saa oletusarvokseen newNamen eli input kentän oletusarvo */}
      {/* onChange saa tapahtumankäsittelijän syötteen käsittelylle */}
      <form onSubmit={handleSubmit}>
        <div>
        name: <input 
        value={newName}
        onChange={handleName} 
         />
         <div>number: <input 
        value={newNumber}
        onChange={handleNumber} 
         />
         </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*Käytetään map metodia persons listalla uuden nimen näkymän näyttämiseen.
       Nimi toimii uniikkina Id:nä. */}
      <ul>
      {persons.map(person => (
      <li key={person.name}>{person.name}: {person.number}</li>
      ))}
    </ul>
    </div>
  )

}

export default App