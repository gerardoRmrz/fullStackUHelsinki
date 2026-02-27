const baseURL = 'http://localhost:3001/anecdotes'

export const getNotes = async () => {
      const response = await fetch(baseURL)
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }

      return await response.json()
    }

export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'content-Type': 'application/json'},
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseURL, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }

  return await response.json()
}