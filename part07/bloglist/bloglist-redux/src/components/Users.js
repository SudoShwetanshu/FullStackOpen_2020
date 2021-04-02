import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const userArray = useSelector(state => state.users)

  return (
    <div>
      <table style={{ width: '40%', marginTop: '4%' }}>
        <tr><td><strong>User</strong></td>  <td><strong>No. Of Blogs</strong>  </td></tr>
        {userArray.map(user =>
          <tr key={user.id}>
            <Link key={user.id} to={`/users/${user.id}`}>
              <td style={{ width: '100%' }}>{user.name} </td> <td> {user.blogs.length}</td>
            </Link>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users
