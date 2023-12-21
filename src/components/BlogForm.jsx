import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = {
      title,
      author,
      url,
      likes
    }
    createBlog(blog)

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')

  }

  return( <>
    <h3> Add new blog </h3>
    <form onSubmit={handleSubmit}>
      <label>title <input placeholder='input_title' type='text' value={title} onChange={ (e) => setTitle(e.target.value) } /></label>
      <label> author <input placeholder='input_author' type='text' value={author} onChange={ (e) => setAuthor(e.target.value) } /></label>
      <label> url <input placeholder='input_url' type='text' value={url} onChange={ (e) => setUrl(e.target.value) } /></label>
      <label> likes <input placeholder='input_likes' type='text' value={likes} onChange={ (e) => setLikes(e.target.value) } /> </label>
      <button placeholder='form_submit' type='submit'> add blog </button>
    </form>

  </> )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
