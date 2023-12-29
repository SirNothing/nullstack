import { voteAnec } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifiReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector( ({anecdotes, filter}) => {
    console.log(`get filter from store: ${filter} for anec: ${JSON.stringify(anecdotes[0])}`)
    return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()) )
  })

  const handleVote = (event, anec) => {
    event.preventDefault()
    console.log(`ID to vote: ${anec.id}`)
    dispatch(voteAnec(anec))
    dispatch(setNotification(`Voted anecdote: ${anec.content}`, 5))
  }

  return(<>
    <ul>
    { anecdotes.sort((first, next) => next.votes - first.votes)
        .map(anec => {
          return(<> <li key={anec.id}> {anec.content}
             <br/> has {anec.votes} votes 
              <button onClick={(event) => handleVote(event, anec)} type='button' name='votes'> Vote! </button> 
          </li> </>)
        })
    }
    </ul>
  </>)
}
export default AnecdoteList
