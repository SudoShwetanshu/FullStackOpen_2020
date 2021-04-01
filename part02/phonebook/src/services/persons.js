import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
}

const add = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

const update = (id, changedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, changedPerson)
  return request
}

export default {
  getAll: getAll,
  add,
  remove,
  update
}
