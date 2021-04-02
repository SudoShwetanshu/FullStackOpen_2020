import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewblogForm from './NewBlogForm'

describe('New Blog Form', () => {
  test('correctly calls prop function on submit', () => {
    const mockHandler = jest.fn()
    const container = render(
      <NewblogForm submit={mockHandler} />
    )

    const form = container.container.querySelector('#form')
    const title = container.container.querySelector('#newblog-title')
    const author = container.container.querySelector('#newblog-author')
    const url = container.container.querySelector('#newblog-url')

    fireEvent.change(title, {
      target: { value: 'Title' }
    })
    fireEvent.change(author, {
      target: { value: 'Author' }
    })
    fireEvent.change(url, {
      target: { value: 'www.url.com' }
    })

    fireEvent.submit(form)

    expect(mockHandler).toHaveBeenCalledWith({
      title: 'Title',
      author: 'Author',
      url: 'www.url.com'
    })
  })
})
