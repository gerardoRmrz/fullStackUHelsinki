const baseURL = 'http://localhost:3001/anecdotes'

export const getNotes = async () => {
      const response = await fetch(baseURL)
      if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
      }

      return await response.json()
    }