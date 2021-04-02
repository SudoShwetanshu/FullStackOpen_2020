import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const anecdoteToVote = state.find(a => a.id === action.id)
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anecdote => anecdote.id !== action.id ? anecdote : updatedAnecdote)
    }
    case 'CREATE': {
      const anecdote = { content: action.content, id: action.id || getId(), votes: action.votes || 0 }
      return [...state, anecdote]
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (anecdoteParam) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(anecdoteParam)
    dispatch({
      type: 'CREATE',
      content: anecdote.content,
      votes: anecdote.votes,
      id: anecdote.id
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdoteArray = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdoteArray
    })
  }
}

export default reducer
