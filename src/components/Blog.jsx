import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, delBlog }) => {
  const [info, setInfo] = useState(false)

  const handleShow = () => {
    setInfo(!info)
  }

  const handleDel = (e) => {
    if( window.confirm('Sure wanna delete..?')) {
      delBlog(blog.id)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  let checkUser = JSON.parse(window.localStorage.getItem('user'))
  checkUser = checkUser ? checkUser.username : ""

  if( !info ) {
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={handleShow} placeholder='show_more' id='show_more' type='button' value='Show'> Show more.. </button>
      </div>
    )
  } else {
    return( <div className='hiddenText' style={blogStyle}>
      <br/>{blog.title} {blog.author}
      <button onClick={handleShow} placeholder='hide' type='button' value='hide'> Hide.. </button>
      <br/> {blog.url} <br/> {blog.likes}
      <button onClick={() => likeBlog(blog.id, blog)} id='like' placeholder='like' type='text' value='like'> like it </button> <br/>
      <p> Created: {blog.user.username} </p>
      { blog.user.username === checkUser ? <button onClick={handleDel} placeholder='delete' type='button' value='del'> remove </button>
        : '' }
    </div>)
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired
}
export default Blog
