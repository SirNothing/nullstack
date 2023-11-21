import axios from 'axios'

export const getPersons = () => {

  const request = axios.get('http://localhost:3001/persons')
  return request.then(resp => resp.data )
  .catch(error => window.alert(`can't get persons ${error.message}`))
}

export const addPerson = (person) => {

  const request = axios.post('http://localhost:3001/persons', person)
  return request.then(resp => resp.data)
  .catch(error => window.alert(`can't add ${person}`))
}

export const delPerson = (id) => {

  console.log(`nothing coming here? ${id}`)
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request.then(resp => resp.data)
  .catch(error => alert(`could't delete ${id} error: ${error.message}`))
}

export const updatePerson = (id, update) => {
  console.log(`MIkä iidee tulee updatee: ${JSON.stringify(id)}`)
  const request = axios.put(`http://localhost:3001/persons/${id}`, update)
  return request.then(updated => updated.data)
  .catch(error => `could not update person: ${error.message}`)
}

export default {getPersons, addPerson, delPerson, updatePerson}
