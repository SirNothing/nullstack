import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  
  const createBlog = async(blog) => {
    const response = await blogService.addBlog(blog)
    setBlogs(blogs.concat(response))
    setMessage(`blog created: ${response}`)
  }

  useEffect(() => {
    setUser(window.localStorage.getItem('user'))
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      console.log(`typeod blogs: ${typeof blogs} ${JSON.stringify(blogs)}`)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  return (
    <div>
      <Notification message={message} />
      <Login setUser={setUser} user={user} setMessage={setMessage} />
      {user
        ? <span>
          <Togglable buttonLabel='new blog'>
            <BlogForm createBlog={createBlog} setMessage={setMessage} />
          </Togglable>
          <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </span>
        : null }
    </div>
  )
}

export default App
