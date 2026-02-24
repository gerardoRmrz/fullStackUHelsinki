import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { newAnecdoteNotification } from '../reducers/notificationReducer'

  const Form = () => {
    const dispatch = useDispatch() 
    
    const addAnecdotes = (event) => {
      event.preventDefault()
      dispatch( newAnecdote(event.target.anecdote.value) )
      dispatch( newAnecdoteNotification(event.target.anecdote.value) )
      event.target.anecdote.value = ''
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