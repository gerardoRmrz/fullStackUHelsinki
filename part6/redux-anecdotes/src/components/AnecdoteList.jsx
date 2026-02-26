import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () =>{
  
  const dispatch = useDispatch()
  
  const filteredAnecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ){
      return state.anecdotes
    }
    return state.anecdotes
            .filter( anecdote => anecdote.content.includes( state.filter ) )
  })

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = filteredAnecdotes.find( n => n.id === id )
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <>
      {[...filteredAnecdotes].sort((a,b) => b.votes - a.votes ).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}      
    </>
  )
}

export default AnecdoteList
