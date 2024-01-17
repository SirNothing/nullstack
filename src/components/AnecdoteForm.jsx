import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotifContext from '../notifContext'

const AnecdoteForm = () => {

  const [ notif, notidDispatch] = useContext(NotifContext)
  const queryClient = useQueryClient()
  
  
  const newMutation = useMutation({ 
    mutationFn: (content) => axios.post('http://localhost:3001/anecdotes', content).then(res => res.data),
    onSuccess: (status) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      notidDispatch({ type: 'error', message: `${error.response.data.error}` })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newMutation.mutateAsync({ content: content, votes: 0 })
    notidDispatch({ type: 'anecdote' , message: content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
