import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AllBlogs = ({ user, handleDelete, handleLike }) => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <li key={blog.id}>{blog.title}</li>
        </Link>
      )}
    </div>
  )
}

export default AllBlogs
