import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

 {/* Tapahtumankäsittelijä lomakkeen käsittelylle,
   jotta muutokset ppäivittyvät persons tilan listaan. */}
  const handleSubmit = (event) => {
    console.log('Uusi nimi käsitelty')
    setNewName(event.target.value)
  }
 {/* Nimen lisäyksen tapahtumankäsittelijä */}
  const addNewName= (event) => {
    {/* Lomakkeen oletusarvoinen toiminta estetty */}
    event.preventDefault()
    console.log('Uusi nimi lisätty')
    const names = {
     name: newName}
    const check = persons.find(({ name }) => name === newName);
    console.log(check)
    if(check){
      alert(`${newName} löytyy jo listalta`)
    } else {
    setPersons(persons.concat(names))
    setNewName('')
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Lomakkeen onSubmit saa tapahtumankäsittelijän nimen lisäykselle */}
      {/* Value saa oletusarvokseen newNamen eli input kentän oletusarvo */}
      {/* onChange saa tapahtumankäsittelijän syötteen käsittelylle */}
      <form onSubmit={addNewName}>
        <div>
        name: <input 
        value={newName}
        onChange={handleSubmit} 
         />
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
      <li key={person.name}>{person.name}</li>
      ))}
    </ul>
    </div>
  )

}

export default App