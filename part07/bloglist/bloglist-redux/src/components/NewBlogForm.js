import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const NewblogForm = ({ submit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const history = useHistory()

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    const blogObj = {
      author: author,
      title: title,
      url: url
    }
    submit(blogObj)
    setUrl('')
    setAuthor('')
    setTitle('')
    history.push('/')
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <div> <h2>Create New Blog!</h2>
      <form onSubmit={handleBlogSubmit}>
        <p>title: <input type='text' name='Title' onChange={handleTitleChange} value={title} required id='newblog-title' />  </p>
        <p>author: <input type='text' name='Author' onChange={handleAuthorChange} value={author} required id='newblog-author' />  </p>
        <p>URL: <input type='text' name='URL' onChange={handleUrlChange} value={url} required id='newblog-url' />    </p>
        <p> <button className='submitbutton' type='submit' id='newblog-submit-btn'>Submit</button> </p>
      </form>
    </div>
  )
}

export default NewblogForm
