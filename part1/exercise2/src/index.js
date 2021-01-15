import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({ array }) => {
  // console.log(array)
  return (
    <div>
      <p>{array.name} {array.exercises}</p>
    </div>
  )
};


const Header = (props) => {
  // console.log(props)
  const {course} = props
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
};

const Content = (props) => {
  const arrays = props.parts.parts;

  return (
    <div>
      {arrays.map((array, i) => <Part key={i} array={array} />)}
    </div>
  )
};


const Total = (props) => {
  const arrays  = props.parts.parts
  // console.log(arrays[0].exercises)
  return (
    <div>
      <p>Number of exercises {arrays[0].exercises + arrays[1].exercises + arrays[2].exercises} </p>
    </div>
  )
}



const App = () => {
  // console.log(props)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>

  )
}
ReactDOM.render(<App />, document.getElementById('root'))
