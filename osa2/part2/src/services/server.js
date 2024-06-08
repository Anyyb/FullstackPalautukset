import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addNewName = (newName) => {
  return axios.post(baseUrl, newName)
}

const addNewNumber = (newNumber) => {
  return axios.post(baseUrl, newNumber)
}

export default {
    getAll: getAll,
    addNewName: addNewName,
    addNewNumber: addNewNumber
}