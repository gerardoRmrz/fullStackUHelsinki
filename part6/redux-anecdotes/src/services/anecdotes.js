const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return await response.json()
}

const createNew = async (content) => {
  console.log('createNew: ', content)
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes:0 })
  })

  if (!response.ok) {
    throw new Error('failed to create anecdote')
  }

  return await response.json()
}

const voteAnecdote = async (anecdote) => {
  const response = await fetch( `${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...anecdote, votes: anecdote.votes+1 })
  } )

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export default { getAll, createNew, voteAnecdote }