import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const result = await axios.post(baseUrl, newObj, config)
  return result.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const result = await axios.delete(`${baseUrl}/${id}`, config)
  return result.data
}

const update = async (id, blog) => {
  
  const result = await axios.put(`${baseUrl}/${id}`, blog)
  return result.data
}

export default { getAll, setToken, create, remove, update }
