import { useSelector, useDispatch } from 'react-redux'
import { vote, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const addAnecdotes = (event) => {
    event.preventDefault()
    dispatch( newAnecdote(event.target.anecdote.value) )
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes ).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={(event) => addAnecdotes(event)}>
        <div>
          <input type='text' name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
