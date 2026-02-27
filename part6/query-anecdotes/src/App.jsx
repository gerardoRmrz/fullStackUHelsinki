import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0 })
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getNotes,
    retry:1,
    refetchOnWindowFocus: false
  })

  if(result.isError) {
    return (
      <div>anecdote service not available due problems in server</div>
    )
  }

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return (
      <div>loading data...</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
