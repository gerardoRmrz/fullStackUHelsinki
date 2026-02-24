import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  {content: 'If it hurts, do it more often', id: 1, votes: 0},
  {content:'Adding manpower to a late software project makes it later!', id: 2, votes: 0},
  {content:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: 3, votes: 0},
  {content:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: 4, votes: 0},
  {content:'Premature optimization is the root of all evil.', id: 5, votes: 0},
  {content:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: 6, votes: 0}
]

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
  initialState: anecdotesAtStart,
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
    newAnecdote(state, action) {
      state.concat( asObject(action.payload) )
    },
  },
})


/* export const vote = id => {
    return {
      type: 'VOTE',
      payload: id
    }
  }

export const newAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      payload: content
    }
  }

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'VOTE':{
      const id = action.payload
      const anecdoteToChange = state.find( n => n.id === id )
      const changedAnecdote = {
        ... anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map( anecdote => anecdote.id !== id 
        ? anecdote
        : changedAnecdote )
      }
    case 'NEW_ANECDOTE': {
      return state.concat( asObject(action.payload) )
    }
  }

  return state
}
 */
export const { vote, newAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer
