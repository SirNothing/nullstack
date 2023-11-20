import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040040040'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleName = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }
  const handlePhone = (e) => {
    e.preventDefault()
    setNewPhone(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if( persons.filter( (per) => per.name.toLowerCase() === newName.toLowerCase() ).length > 0) {
      window.alert(`${newName} already added!`)
    }else {
      const newPersons = [ ...persons, { name: newName, phone: newPhone } ]
      setPersons(newPersons)
    }
    setNewPhone('')
    setNewName('')
    
  }
  const handleFilter = (e) => {
    e.preventDefault()
    setNewFilter(e.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      
      <h2> Add a new </h2>
      <PersonForm handleName={handleName} handlePhone={handlePhone} newName={newName} newPhone={newPhone} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App
