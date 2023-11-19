import { useState } from 'react'


const Statistics = ({good, neutral, bad, all, average, positive}) => {
  
  if(all == 0) {
    return( <> <b> No feedback given </b> </> )
  }

  return( <>
      <table>
        <thead>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positive} />
          </tr>
        </thead>
      </table>
  </> )
}

const StatisticLine = ({text, value}) => {
  return( <>
    <td>{ text }</td><td>{value} {text=="positive" ? "%" : ""}</td>
  </> )
}

const Button = ({text, handleClick }) => {
  return( <>
    <button onClick={handleClick} > {text} </button>
  </> )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h2> statistics </h2>
      <br />
      <Statistics 
         good={good} 
         neutral={neutral} 
         bad={bad} 
         all={bad + neutral + good}
         average={ (good - bad) / (good + bad + neutral) } 
         positive={ (good / (neutral + bad + good)) * 100 } 
      />
    </div>
  )
}

export default App
