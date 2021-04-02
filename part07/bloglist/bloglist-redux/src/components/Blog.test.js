import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'

describe('BLOG component test suit', () => {
  let blog
  beforeEach(() => {
    blog = {
      title: 'Title',
      author: 'Author',
      url: 'http://gbgbnvbn.com',
      likes: 99,
      user: { username: 'username', name: 'Name' },
      id: 'idofmongoxx'
    }
  })
  afterEach(() => {
    cleanup()
  })

  test('the component displaying a blog renders the blogss title and author, but does not render its url or number of likes', () => {
    const container = render(
      <Blog blog={blog} />
    )
    const element = container.container.querySelector('#likes')
    expect(element).not.toBeVisible()
    expect(container.container).toHaveTextContent(blog.author)
    expect(container.container).toHaveTextContent(blog.title)

    const urlElement = container.container.querySelector('#url')
    expect(urlElement).not.toBeVisible()
  })

  test(' blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const { container } = render(
      <Blog blog={blog} />
    )
    const showButton = container.querySelector('.toggleOpen')
    fireEvent.click(showButton)

    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).toHaveTextContent(blog.likes)

    const urlElement = container.querySelector('#url')
    expect(urlElement).toBeVisible()
  })

  test('like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockHandler = jest.fn()
    const container = render(
      <Blog blog={blog} likeButtonAction={mockHandler} />
    )
    const showButton = container.container.querySelector('.toggleOpen')
    fireEvent.click(showButton)

    const likeButton = container.container.querySelector('.submitbutton')
    likeButton.click()
    likeButton.click()
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
