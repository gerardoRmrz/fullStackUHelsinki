import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find( n => n.id === id )
      const changedAnecdote = {
        ... anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map( 
        anecdote => anecdote.id !== id 
          ? anecdote
          : changedAnecdote )
    },
    createAnecdote(state, action) {
      state.concat( asObject(action.payload) )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { vote, createAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
