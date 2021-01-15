import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [vote, setVote] = useState([])

  const randon = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  } // code pour générer un nombre aléatoire


  const buton = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    if(points[selected] === 7 && selected === 1 ){
      setVote(vote.concat(props.anecdotes[selected]))
      
    }
  }
 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>has {points[selected]} vote</p>
      <div>
        <button onClick={() => buton(selected)} >vote</button>
        <button onClick={() => setSelected(randon(5, 1))} >next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{vote}</p>
      <p>has  vote</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)