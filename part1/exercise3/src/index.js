import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {

  return (
    <div>
      <button onClick={props.handleClick} >{props.text}</button>
    </div>
  )
}

const Statistics = ({ good, neutral, bad, all, goodAndBad }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={goodAndBad / all} />
      <StatisticLine text="positive " value={100 * good / all} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>{text} {value} </td>
          </tr>
        </thead>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodBtn = () => {
    setGood(good + 1);
  }

  const neutralBtn = () => {
    setNeutral(neutral + 1)
  }

  const badBtn = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad;
  const goodAndBad = good - bad;
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => goodBtn()} text="good" />
      <Button handleClick={() => neutralBtn()} text="neutral" />
      <Button handleClick={() => badBtn()} text="bad" />
      <h2>statitics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} goodAndBad={goodAndBad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)