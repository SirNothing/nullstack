import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await blogService.addBlog({title, author, url, likes})
      if ( result.error ) {
        setMessage(result.error)
        setTimeout(() => {
          setMessage('')
        }, 3000)
        return null
      }
      setBlogs(blogs.concat(result))
      setMessage(`New blog added: ${JSON.stringify(result)}`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }catch(error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')

  }

  return( <>
    <h3> Add new blog </h3>
    <form onSubmit={handleSubmit}>
      <label>title <input type='text' value={title} onChange={ (e) => setTitle(e.target.value) } /></label>
      <label> author <input type='text' value={author} onChange={ (e) => setAuthor(e.target.value) } /></label>
      <label> url <input type='text' value={url} onChange={ (e) => setUrl(e.target.value) } /></label>
      <label> likes <input type='text' value={likes} onChange={ (e) => setLikes(e.target.value) } /> </label>
      <button type='submit'> add blog </button>
    </form>

  </> )
}
export default BlogForm
