import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendAnecdote } from '../reducers/anecdoteReducer'

  const Form = () => {
    const dispatch = useDispatch() 
    
    const addAnecdotes = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(appendAnecdote(content))
      dispatch( setNotification(`you added '${content}'`, 10) )
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