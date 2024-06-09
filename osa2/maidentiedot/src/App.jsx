import { useState, useEffect } from 'react'
import server from './services/server'
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    server
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  //formin lähettämisen tapahtumankuunteliafunktio, asettaa haun maiden tilaan
  const onSearch = (event) => {
    event.preventDefault()
    setCountries(search)
  }
//käsitellään hakukenttään syötettävää hakua
const handleSearch = (event) => {
  event.preventDefault()
  const query = event.target.value
  setSearch(query)

// jos maita on enemmän kuin 10 haun tulosten pituus on > 10
// error viesti näkyy myös alemman tarkastuksen yhteydessä, vaikka ei kuuluisi.
  if (countriesToShow.length > 10) {
    setErrorMessage('Too many matches, refine')
    setTimeout(() => {
    setErrorMessage(null)
    }, 4000)
  }
  if (countriesToShow.length == 1 && countriesToShow.length < 10) {
    setSearch(query);
  }
  if (countriesToShow.length === 1 ) {
    setSearch(query);
  }
}
// näytetään maat hakutulosten perusteella
const countriesToShow = search
  ? countries.filter(country =>
    country.name.official.toLowerCase().includes(search.toLowerCase()))
  : countries;

return (
  <div>
    <h2>Search country information:</h2>
    <SearchField onSearch={onSearch} handleSearch={handleSearch} />
    <Notification message={errorMessage} />
    <h2>Countries:</h2>
    <CountryList countriesToShow={countriesToShow}/>
  </div>
)
}
const SearchField = (props) => {
  return (
    <div>
      <form onSubmit={props.onSearch}>
         country: <input value={props.search} onChange={props.handleSearch} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
const CountryList = (props) => {
  return (
    <div>
       <ul>
        {props.countriesToShow.map(country => (
          <li key={country.name}>{country.name.official}</li>
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
      <h3>{message}</h3>
    </div>
  )
}
  export default App