import React from 'react'


const Persons = ({ person, togglePerson }) => {

    return (
        <div>
            <p>{person.name} {person.number} <button onClick={togglePerson}>delete</button> </p>
        </div>
    )
}

export default Persons;
