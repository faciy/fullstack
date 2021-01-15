import React from 'react'


const Persons = ({ person }) => {

    return (
        <div>
            {person.map((personne, i) => <p key={i} >{personne.name} {personne.number}</p>)}
        </div>
    )
}

export default Persons;
