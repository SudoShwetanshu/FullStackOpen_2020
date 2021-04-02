import React, { useState } from 'react'

const NewblogForm = ({ submit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = (event) => {
    const blogObj = {
      author: author,
      title: title,
      url: url
    }
    submit(blogObj)
    setUrl('')
    setAuthor('')
    setTitle('')
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
      <form onSubmit={handleBlogSubmit} id='form'>
        <p>title: <input type='text' name='Title' onChange={handleTitleChange} value={title} required id='newblog-title' />  </p>
        <p>author: <input type='text' name='Author' onChange={handleAuthorChange} value={author} required id='newblog-author' />  </p>
        <p>URL: <input type='text' name='URL' onChange={handleUrlChange} value={url} required id='newblog-url' />    </p>
        <p> <button className='submitbutton' type='submit' id='newblog-submit-btn'>Submit</button> </p>
      </form>
    </div>
  )
}

export default NewblogForm
