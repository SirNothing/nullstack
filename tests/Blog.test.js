import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'

const delBlog = () => {}
const likeBlog = () => {}
const blog = {
  title: "Testitteli",
  author: "Terttu",
  url: "www.test.fi",
  likes: 1,
  user: {
    id: "12345678",
    username: "Testaaja",
    name: "Testi taajanen"
  },
id: "7654321"
}
describe('Blog testing..', () => {
  beforeEach(() => {
  
  })
  test('Only render title. NO url, likes...', () => {
    render(<Blog blog={blog} likeBlog={likeBlog} delBlog={delBlog} />)
    const element = screen.getByText('Testitteli')
    expect(element).toBeDefined()
    const nolement = screen.queryByText('Terttu')
    expect(nolement).toBeNull()
  })

  test('Render all after show-button pressed', async() => {
    const { container } = render(<Blog blog={blog} delBlog={delBlog} likeBlog={likeBlog} />)
    const user = userEvent.setup()

    const button = screen.getByPlaceholderText('show')
    await user.click(button)

    const element = screen.findByText('www.test.fi')
    const element2 = screen.findByText('Testaaja')
    const element3 = screen.findByText('1')
    expect(element).toBeDefined()
    expect(element2).toBeDefined()
  })

  test('Like button is working', async() => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} delBlog={delBlog} likeBlog={() => mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('Show more..')

    await user.click(button)
    screen.debug()
    const likeButton = screen.getByText('like it')
    await user.click(likeButton)
    await user.click(likeButton)
    const likeButton2 = screen.getByPlaceholderText('like')
    await user.click(likeButton2)
    await user.click(likeButton2)
    screen.debug()
    expect(mockHandler).toHaveBeenCalledTimes(4)
  })
  test('Likes second time', async() => {
    const mockhandl = jest.fn()
    const mockhandleri = jest.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} delBlog={mockhandleri} likeBlog={() => mockhandl} />)
    const showButt = screen.getByText(/show/i)
    await user.click(showButt)
    const likeButton = screen.getByText('like it')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockhandl).toHaveBeenCalledTimes(2)
  })
})
