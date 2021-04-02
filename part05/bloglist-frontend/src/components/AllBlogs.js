import React from 'react'
import Blog from './Blog'

const AllBlogs = ({ blogs, user, handleDelete, handleLike }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog?.id} blog={blog} user={user} deleteButtonAction={handleDelete} likeButtonAction={handleLike} />
      )}
    </div>
  )
}

export default AllBlogs
