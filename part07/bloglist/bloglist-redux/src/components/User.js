import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      <h2> {user?.name} </h2>
      <br />
      <h5>Added blogs</h5>
      <br />
      <div>
        {user?.blogs.map(blog =>
          <li key={user.id}>
            {blog.title}
          </li>)}
      </div>
    </div>
  )
}

export default User
