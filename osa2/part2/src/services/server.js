import axios from 'axios'

 {/* Haetaan dataa palvelimelta axios.get hakee tiedot palvelimelta (palvelimen oisoite) 
   jos yhteys onnistuu ja palvelin on käynnissä promise on fulfilled ja haettu data 
   asetetaan renderöitäväksi app-komponentin persons tilaan, kun tämä moduuli exportataan. */}

/*const baseUrl = 'http://localhost:3001/persons'*/
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addNewName = (newName) => {
  return axios.post(baseUrl, newName)
}

const addNewNumber = (newNumber) => {
  return axios.post(baseUrl, newNumber)
}
const deleteNameandNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const updateNumber = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, newNumber)
}

export default {
    getAll,
    addNewName,
    addNewNumber,
    deleteNameandNumber,
    updateNumber
}