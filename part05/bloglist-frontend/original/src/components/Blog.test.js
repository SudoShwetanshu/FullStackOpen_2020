import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 33,
    url: 'url'
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title'
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  


})