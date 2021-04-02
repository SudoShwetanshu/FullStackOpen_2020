import axios from 'axios'
const baseUrl = '/api/users'

const signUp = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { signUp, getAll }
