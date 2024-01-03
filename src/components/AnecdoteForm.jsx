import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newMutation = useMutation({ 
    mutationFn: (content) => axios.post('http://localhost:3001/anecdotes', content).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newMutation.mutate({ content: content, votes: 0 })
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
