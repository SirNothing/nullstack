import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [info, setInfo] = useState(false)

  const handleShow = () => {
    setInfo(!info)
  }
  const handleLikes = (e) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeBlog(blog.id, updatedBlog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if( !info ) {
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={handleShow}  type='button' value='Show'> Show more.. </button> 
      </div>
    )
  } else {
      return( <div style={blogStyle}><br/>{blog.title} {blog.author} 
        <button onClick={handleShow} type='button' value='hide'> Hide.. </button>
        <br/> {blog.url} <br/> {blog.likes}
        <button onClick={handleLikes} type='text' value='like'> like it </button> <br/>
        <p> Created: {blog.user.username} </p> 
      </div>)
  }
}

export default Blog
