import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from '../src/components/BlogForm'

test('Adding new blog', async() => {
  const user = userEvent.setup()
  const mochandle = jest.fn()

  render(<BlogForm createBlog={mochandle} />)

  await user.click(screen.getByText(/new blog/i))

  const submitButton = screen.getByPlaceholderText('form_submit')
  const input_title = screen.getByPlaceholderText('input_title')
  const input_author = screen.getByPlaceholderText('input_author')
  const input_url = screen.getByPlaceholderText('input_url')
  const input_likes = screen.getByPlaceholderText('input_likes')

  const newBlog = {
    title: "Titteli",
    author: "Aatu",
    url: "www.titteliaatuli.com",
    likes: "1"
  }

  await user.type(input_title, newBlog.title)
  await user.type(input_author, newBlog.author)
  await user.type(input_url, newBlog.url)
  await user.type(input_likes, newBlog.likes)
  await user.click(submitButton)

  expect(mochandle).toHaveBeenCalledTimes(1)
  expect(mochandle.mock.calls[0][0]).toMatchObject(newBlog)
})
