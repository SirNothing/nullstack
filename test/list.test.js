const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }]

  const emptyList = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Test total Likes func', () => {
  

  test('summing likes from single blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('Summin multiple likes from list of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('Summin empty list for likes', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('Testing favoriteLikes func', () => {
    
  test('Many on a blog list', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('Only one blog post', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('Empty list', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(null)
  })
})

describe('mostBlogs per author', () => {

  test('many blogs on a list', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
  })

  test('one blog test', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({author: listWithOneBlog.author, blogs: 1})
  })

  test('empty array', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })
})

describe('mostLikes per author', () => {

  test('many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })

  test('empty blog', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(null)
  })

  test('one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({author: listWithOneBlog.author, likes: listWithOneBlog.likes})
  })
})


