import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const getVoted = (votes) => {
    let maxIndx = 0
    for( let i = 1; i < votes.length; i++) {
      if( votes[i] >= votes[maxIndx] ) {
        maxIndx = i
      }
    }
    return maxIndx
  }

  const handleVotes = (e) => {
    setVotes(votes.map((vote, i) => i == selected ? votes[i] += 1 : votes[i] ))
  }
  
  const [ votes, setVotes ] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const voted = getVoted(votes)

  console.log("votes: ", votes)
  console.log("selected", selected)
  return (
    <div>
      <h2> Anecdote of the day </h2>
      {anecdotes[selected]} <br />
      has votes { votes[selected] } <br />
      <button onClick={handleVotes} > vote </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * (8)) )} > next anecdote </button>

      <br />
      <h2> Anecdote with most votes </h2>
      { anecdotes[voted] } <br />
      votes: { votes[voted]}
    </div>
  )
}

export default App
