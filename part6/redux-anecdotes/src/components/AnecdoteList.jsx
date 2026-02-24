import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () =>{
  
  const dispatch = useDispatch()
  
  const filteredAnecdotes = useSelector(state => {
    
    if ( state.filter === 'ALL' ){
      return state.anecdotes
    }
    return state.anecdotes
            .filter( anecdote => anecdote.content.includes( state.filter ) )
  })

  return (
    <>
      {[...filteredAnecdotes].sort((a,b) => b.votes - a.votes ).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}      
    </>
  )
}

export default AnecdoteList
