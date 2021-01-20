import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import Persons from './components/Persons'
import personService from './services/person'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="succes">
      <p>{message}</p>
    </div>
  )
}

const ErroNotification = ({ messageError }) => {
  if (messageError === null) {
    return null
  }
    return (
      <div className="error">
        <p>{messageError}</p>
      </div>
    )
}

const App = () => {

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise', response.data)
        setPersons(response.data)
      })
  }, [])

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    // console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleChangeSeach = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
  }


  const addName = (event) => {
    event.preventDefault()
    const block = persons.map((personne) => personne.name).includes(newName)
    // console.log(block)
    if (!block) {
      const newObjet = {
        name: newName,
        number: number
      }
      personService
        .create(newObjet)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccesMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setSuccesMessage(null)
          }, 5000)
          setNewName('')
          setNumber('')
        })

    } else {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const id = filterName.filter(val => val.name === newName)[0].id
        const idsearch = persons.find(val => val.id === id)
        const idmodif = { ...idsearch, number: number }
        axios.put('http://localhost:3001/persons/' + id, idmodif)
          .then(response => {
            setPersons(persons.map(val => val.id !== id ? val : response.data))
            setSuccesMessage(
              `Modificate Number of ${newName} in ${number}`
            )
            setTimeout(() => {
              setSuccesMessage(null)
            }, 5000)
            setNewName('')
            setNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Note '${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

      }
    }

  }

  const filterName = persons.filter(filtername => {
    return filtername.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  const togglePersonOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const url = `http://localhost:3001/persons/${id}`
    console.log('url', url)
    const person = filterName.find(p => p.id === id)
    if (window.confirm('Delete ' + person.name + ' ?')) {
      axios.delete(url)
        .then(response => {
          setPersons(filterName.filter(p => p.id !== id))
          setSuccesMessage(
            `Delete ${newName}`
          )
          setTimeout(() => {
            setSuccesMessage(null)
          }, 5000)
          setNewName('')
          setNumber('')
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={succesMessage} />
      <ErroNotification messageError={errorMessage} />
      <Filter value={search} onChange={handleChangeSeach} />
      <h2>add a new</h2>
      <PersonForm onChange={handleChange} onChangeNumber={handleChangeNumber} onSubmit={addName} valueName={newName} valueNumber={number} />
      <h2>Numbers</h2>
      {filterName.map(person =>
        <Persons key={person.id} person={person} togglePerson={() => togglePersonOf(person.id)} />
      )}
    </div>
  )

}

export default App