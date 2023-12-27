import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const handleVote = (event, id) => {
    event.preventDefault()
    console.log(`ID to vote: ${id}`)
    dispatch(vote(id))
  }
  console.log(`anecdotes: ${JSON.stringify(anecdotes)}`)
  return(<>
    <ul>
    { anecdotes.sort((first, next) => next.votes - first.votes)
        .map(anec => {
          return(<> <li key={anec.id}> {anec.content}
             <br/> has {anec.votes} votes 
              <button onClick={(event) => handleVote(event, anec.id)} type='button' name='votes'> Vote! </button> 
          </li> </>)
        })
    }
    </ul>
  </>)
}
export default AnecdoteList
