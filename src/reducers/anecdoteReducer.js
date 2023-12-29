import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// export const addAnec = (content) => {
//   const newAnec = {
//     content: content,
//     id: getId(),
//     votes: 0
//   }
//   return {
//     type: 'ADDANECDOTE',
//     payload: newAnec
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'INCREMENT',
//     payload: {id}
//   }
// }

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], 
  reducers: {
    addAnec(state, action) {
      return state.concat(action.payload)
    },
    vote(state, action) {
      const change = action.payload
      return state.map(anec => anec.id !== change.id ? anec : change)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnec, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initialize = () => {
  return async dispatch => {
    const resp = await axios.get('http://localhost:3001/anecdotes')
    dispatch(setAnecdotes(resp.data))
  }
}

export const voteAnec = (anec) => {
  const change = {...anec, votes: anec.votes + 1}
  return async dispatch => {
    const voted = await axios.put(`http://localhost:3001/anecdotes/${change.id}`, change)
    console.log(`Voted: ${voted}`)
    dispatch(vote(voted.data))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newDote = await axios.post('http://localhost:3001/anecdotes', {content, votes: 0})
    dispatch(addAnec(newDote.data))
  }
}

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type) {
//     case 'INCREMENT': 
//       let change = state.find(anec => anec.id === action.payload.id) 
//       change = { ...change, votes: change.votes + 1}
//       return state.map(ane => ane.id !== change.id ? ane : change)
//     case 'ADDANECDOTE':
//       return state.concat(action.payload)
//     default:
//       return state
//   }
// }

