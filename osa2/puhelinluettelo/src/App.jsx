import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/personService'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

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
          const newPerson = { id: person.id, name: person.name, number: newPhone }
          personService.updatePerson(person.id, newPerson )
          .then(updated => setPersons(persons.map(per => per.id !== updated.id ? per : updated)))
          .catch(error => {
            setMessage(`deleted already: ${error.message}`)
            setPersons(persons.filter(per => per.id !== person.id))
          })
          setMessage(`Updated number for ${person.name}`)
        }    
      }
  
    }else {
      personService.addPerson({ name: newName, number: newPhone })
      .then(resp => {
        setPersons(persons.concat(resp)) 
        setMessage(`Person added ${resp.name}`)
      })
    } 
    setNewPhone('')
    setNewName('')
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setNewFilter(e.target.value)
  }

  const handleDel = (id) => {
    const person = persons.filter(per => per.id === id).map(per=>per.name)
    if( window.confirm(`Delete ${person} ?`) ) {
    personService.delPerson(id)
    .then( (resp) => {
        setPersons(persons.filter(per => per.id !== id))
      }).catch(error => {
          setMessage(`already deleted ${error.message}`)
          setPersons(persons.filter(per => per.id !== id))
        })
    setMessage(` Person ${person} deleted`)
    }
  }

  return (
    <div>
      <Notification message={message} setMessage={setMessage} />
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
