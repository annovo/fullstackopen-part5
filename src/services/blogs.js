import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const header = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newBlog, header)
  return res.data
}

const update = async (id, updatedBlog) => {
  const url = `${baseUrl}/${id}`
  const res = await axios.put(url, updatedBlog)
  return res.data
}

const getById = async (id) => {
  const url = `${baseUrl}/${id}`
  const res = await axios.get(url)
  return res.data
}

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`
  const header = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(url, header)
  return res.data
}

export default { getAll, create, setToken, update, getById, deleteBlog }