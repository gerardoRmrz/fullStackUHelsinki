import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { newAnecdoteNotification, deleteNotification } from '../reducers/notificationReducer'

  const Form = () => {
    const dispatch = useDispatch() 
    
    const addAnecdotes = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch( createAnecdote(newAnecdote) )
      dispatch( newAnecdoteNotification(newAnecdote.content) )
      
      setTimeout( () => {
        dispatch(deleteNotification())
      },5000 )
    }

    return (
      <>
        <h2>create new</h2>
          <form onSubmit={(event) => addAnecdotes(event)}>
          <div>
            <input type='text' name='anecdote'/>
          </div>
          <button type='submit'>create</button>
        </form>
      </>
      
    )
  }   
  
export default Form