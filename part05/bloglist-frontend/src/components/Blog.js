import React from 'react'
import Toggle from './Toggle'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, deleteButtonAction, likeButtonAction }) => {
  const deleteB = (blog) => {
    const result = window.confirm(`Do you want to delete you blog "${blog.title}"`)
    if (result) {
      deleteButtonAction(blog)
    }
  }

  const likeB = (blog) => {
    likeButtonAction(blog)
  }

  const buttonStyle = { display: blog?.user?.username?.toString() === user?.username?.toString() || blog?.user?.id === user?.id?.toString() ? '' : 'none' }

  return (
    <>
      <div style={blogStyle} className='blog'>
        <div> <span className='blog_title'> <h3>{blog.title}</h3> </span>
          <span className='blog_author'>Author: {blog.author}</span>
          <Toggle buttonLabel='view' id='btnview'>
            <br />
            <div id='likes'>
              LIKES : {blog.likes} <button className='submitbutton' onClick={() => likeB(blog)}>like</button>
            </div>
            <br />
            <div id='url'>URL:  {blog.url} </div>
            <br />
            <div><button style={buttonStyle} className='deletebutton' onClick={() => deleteB(blog)}>Delete Blog</button>  </div>
          </Toggle>
        </div>
      </div>
    </>
  )
}

export default Blog
