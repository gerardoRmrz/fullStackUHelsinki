import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from "../services/anecdotes"

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
      return state.concat( action.payload )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const { setAnecdotes, createAnecdote, vote } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesServices.createNew(content)
    dispatch( createAnecdote(newAnecdote) )
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll()
    const anecdoteToChange = anecdotes.find( n => n.id === id )
    const response = await anecdotesServices.voteAnecdote(anecdoteToChange)
    dispatch(vote(response.id))
  }
}

export default anecdotesSlice.reducer
