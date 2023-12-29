import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifiReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.input_anec.value
    event.target.input_anec.value = ''
    dispatch(createAnec(content))
    dispatch(setNotification(`new anecdote added: ${content}`, 5))
  }

  return(<>
    <form onSubmit={handleSubmit} >
      <input type='text' name='input_anec' />
      <button type='submit'> new anecdote </button>
    </form>
  </>)
}

export default AnecdoteForm
