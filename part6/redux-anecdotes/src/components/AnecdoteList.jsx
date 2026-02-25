import { useSelector, useDispatch } from 'react-redux'
import { voteNotification, deleteNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

import anecdoteServices from '../services/anecdotes'

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
    dispatch(voteNotification(filteredAnecdotes.find( n => n.id === id )))
    setTimeout( () => {
        dispatch(deleteNotification(''))
      },5000 )
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
