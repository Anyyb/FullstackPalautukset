import axios from 'axios'

 {/* Haetaan dataa palvelimelta axios.get hakee tiedot palvelimelta (palvelimen oisoite) 
   jos yhteys onnistuu ja palvelin on käynnissä promise on fulfilled ja haettu data 
   asetetaan renderöitäväksi app-komponentin persons tilaan, kun tämä moduuli exportataan. */}

/*const baseUrl = 'http://localhost:3001/persons'*/
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addNewPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deleteNameandNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const updateNumber = (id,newPerson, newNumber) => {
  return axios.put(`${baseUrl}/${id}`,{ name: newPerson, number: newNumber })
}

export default {
    getAll,
    addNewPerson,
    deleteNameandNumber,
    updateNumber
}