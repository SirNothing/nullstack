import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const App = () => {

  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: (update) => axios.put(`http://localhost:3001/anecdotes/${update.id}`, update).then(res => res.data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      }
  })

  const handleVote = (anecdote) => {
    console.log(`vote for: ${JSON.stringify(anecdote)}`)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateMutation.mutate(newAnecdote)
  }



  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => {
      return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
    }
  })
  
  if( result.isPending ) {
    return <> Is loading... </>
  } else if( result.isError ) {
    return <> Error fetching data... </>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
