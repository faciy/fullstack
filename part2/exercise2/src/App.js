import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

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
    if(!block){
      const newObjet = {
        name: newName,
        number: number
      }
      setPersons(persons.concat(newObjet))
      setNewName('')
      setNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }

  }

  const filterName = persons.filter(filtername => {
    return filtername.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleChangeSeach} />
      <h2>add a new</h2>
      <PersonForm onChange={handleChange} onChangeNumber={handleChangeNumber} onSubmit={addName} valueName={newName} valueNumber={number} />
      <h2>Numbers</h2>
      <Persons person={filterName} />
    </div>
  )

}

export default App