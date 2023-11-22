import axios from 'axios'
import Notification from '../components/Notification'

export const getPersons = () => {

  const request = axios.get('http://localhost:3001/persons')
  return request.then(resp => resp.data )
}

export const addPerson = (person) => {

  const request = axios.post('http://localhost:3001/persons', person)
  return request.then(resp => resp.data)
}

export const delPerson = (id) => {

  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request.then(resp => resp.data)
}

export const updatePerson = (id, update) => {

  const request = axios.put(`http://localhost:3001/persons/${id}`, update)
  return request.then(updated => updated.data)
}

export default {getPersons, addPerson, delPerson, updatePerson}
