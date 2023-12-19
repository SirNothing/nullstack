import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

export const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const addBlog = async (blog) => {
  let token = window.localStorage.getItem('user')
  console.log(`Typeof token: ${typeof token}`)
  token = JSON.parse(token)
  token = `Bearer ${token.token}`
  console.log(`Tokeni haettu: ${token}`)
  try {
    const request = await axios.post(baseUrl, blog, {headers: {Authorization: token } })
    console.log(`addBlog resp: ${JSON.stringify(request.data)}`)
    return request.data
  }catch(error) {
    console.log(`error: ${error.message}`)
    return {error: error.message }
  }

}

export const likeBlog = async(id, blog) => {
  let token = window.localStorage.getItem('user')
  token = JSON.parse(token)
  token = `Bearer ${token.token}`
  try {
    const result = await axios.put(`${baseUrl}/${id}`, blog, { header: { Authorization: token }} )
    return result.data
  }catch(error) {
    return { error: error.message }
  }
}

export default { getAll, addBlog, likeBlog }
