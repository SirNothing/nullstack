import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/personService'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect( () => {
    personService.getPersons()
    .then(resp => setPersons(resp))
  }, [])

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
      if ( persons.filter( per => per.number === newPhone ).length > 0 ) {
        window.alert(`Already added name/number`)
      }else {
        if( window.confirm(`wan't to update number ?`) ) {
          const person = persons.find(per => per.name.toLowerCase() === newName.toLowerCase() )
          console.log(`Mika perso löyty ja mikä id updatee: ${JSON.stringify(person)}`)
          const newPerson = { id: person.id, name: person.name, number: newPhone }
          console.log(`newperson: ${JSON.stringify(newPerson)}`)
          personService.updatePerson(person.id, newPerson )
          .then(updated => setPersons(persons.map(per => per.id !== updated.id ? per : updated)))
        }    
      }
  
    }else {
      personService.addPerson({ name: newName, number: newPhone })
      .then(resp => setPersons([ ...persons, resp ] ))
      console.log(`after adding per: ${persons}`)
    } 
    setNewPhone('')
    setNewName('')
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setNewFilter(e.target.value)
  }

  const handleDel = (id) => {
    if( window.confirm(`Delete ${persons.filter(per => per.id === id).map(per=>per.name)} ?`) ) {
    personService.delPerson(id)
    .then( (resp) => {
        console.log(`del pois listalta`)
        setPersons(persons.filter(per => per.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      
      <h2> Add a new </h2>
      <PersonForm handleName={handleName} handlePhone={handlePhone} newName={newName} newPhone={newPhone} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDel={handleDel} />
    </div>
  )
}

export default App
