import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { message } from '../reducers/notifiReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector( ({anecdotes, filter}) => {
    console.log(`get filter from store: ${filter}`)
    return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()) )
  })

  const handleVote = (event, id) => {
    event.preventDefault()
    console.log(`ID to vote: ${id}`)
    dispatch(vote(id))
    const voted = anecdotes.filter(anec => anec.id === id)
    dispatch(message(`Voted anecdote: ${voted[0].content}`))
  }

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
