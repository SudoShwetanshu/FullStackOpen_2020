import axios from 'axios'
/* import {getId} from '../reducers/anecdoteReducer' */

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const anecdoteObj = { content: anecdote, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const vote = async (anecdote) => {
  const anecdoteObj = { votes: anecdote.votes + 1 }
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdoteObj)
  return response.data
}

export default { getAll, create, vote }
