import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const Heading = (props) => <div> <h1 id='h1'>{props.text}</h1> <p> A basic CRUD REST API by <a href='https://www.github.com/SudoShwetanshu'>SudoShwetanshu</a> , subject to open and free use for all purposes/boiler-plating.</p></div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
      setNotification(null)
    })
  }, [])

  const filtered = persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }
  const handleNoChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleReset = () => {
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = '')
    )
    setNewPerson('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }
    if (persons.filter(e => e.name === personObject.name).length > 0) {
      const ans = window.confirm(`Update ${personObject.name} with the new number ${personObject.number} ?`)
      if (ans) {
        const idToUpdate = persons.find(p => p.name === personObject.name)
        personService.update(idToUpdate.id, personObject).then(response =>
          setPersons(persons.map(p => p.id !== idToUpdate.id ? p : response.data))
        ).then(() => {
          setNotification(`${personObject.name} was updated with the new Number "${personObject.number}"`)
          setTimeout(() => { setNotification(null) }, 5000)
        })
          .catch(error => {
            if (error.response.status === 406) {
              setError(JSON.stringify(error.response.data))
            } else {
              setError(`The information for ${personObject.name} has already been deleted from server!`)
              setPersons(persons.filter(n => n.id !== idToUpdate.id))
            }
            setTimeout(() => { setError(null) }, 5000)
          })
      }
    } else {
      personService.add(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification(`Added ${personObject.name} with number ${personObject.number} to phonebook!`)
          setNewNumber('')
          setNewPerson('')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(err => {
          console.log(` FRONTEND ERROR MSG ${err}`)
          setError(`${JSON.stringify(err.response.data)}`)
          setTimeout(() => { setError(null) }, 5000)
        })
    }
    handleReset()
  }

  const deletePerson = (p) => {
    const mm = window.confirm('Delete?')
    if (mm) {
      personService.remove(p.id).then(
        setPersons(persons.filter(person => person.id !== p.id))
      )
        .catch(() => {
          setError(`The person "${p.name}" was already deleted from server`)
          setPersons(persons.filter(n => n.id !== p.id))
          setTimeout(() => { setError(null) }, 5000)
        })
    }
  }

  return (
    <div className='container'>
      <Notification notification={notification} />
      <Error error={error} />
      <Heading text='Phonebook' />
      <Filter value={search} onChange={handleSearchChange} />
      <h2>Add a new person</h2>
      <PersonForm value={newPerson} onChange={handlePersonChange} onSubmit={addPerson} numberValue={newNumber} onChangeNumber={handleNoChange} />
      <Numbers persons={filtered} deletePerson={deletePerson} />
    </div>
  )
}
export default App
