const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
  return blog.length !== 0 ? 
  blog.map(blo => blo.likes).reduce((prev, curr) => {
    return prev + curr
  })
  :
  0
}

const favoriteBlog = (blogs) => {
  if( blogs.length !== 0 ) {
    const favIndx = blogs.reduce((prev, curr) => {
      if( curr.likes > prev.likes ) {
        return curr
      }
      return prev 
    })
    return favIndx
  }else {
    return null
  }
}

const mostBlogs = (blogs) => {
  const authors = []
  if( blogs.length > 1 ) {
    blogs.forEach( blog => {
      const auth = authors.findIndex( auth => auth.author === blog.author )
      if( auth !== -1 ) {
        console.log(`What came indx search ${auth}`)
        authors[auth].blogs += 1 
      }else {
        authors.push({author: blog.author, blogs: 1})
      }
    })
    return authors.reduce((prev, curr) => {
      if( prev.blogs < curr.blogs ) {
        return curr
      }else {
        return prev
      }
    })
  }else {
    if ( blogs.length === 1 ) {
      return {author: blogs.author, blogs: 1}
    }
    return null
  }
}

const mostLikes = (blogs) => {
  const authors = []
  if( blogs.length > 1 ) {
    blogs.forEach(blog => {
      const auth = authors.findIndex( auth => auth.author === blog.author )
      if( auth !== -1 ) {
        authors[auth].likes += blog.likes
      }else {
        authors.push({author: blog.author, likes: blog.likes})
      }
    })
    return authors.reduce((prev, curr) => {
      if( prev.likes < curr.likes) {
        return curr
      }else {
        return prev
      }
    })
  }else {
    if( blogs.length === 1 ) {
      return {author:blogs.author, likes: blogs.likes}
    }
    return null
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
