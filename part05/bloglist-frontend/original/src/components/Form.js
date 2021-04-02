import React, { useState } from 'react'

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    console.log(username)
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const formSubmit = (event) => {
    event.preventDefault()
    const userObject = { username, password }
    onSubmit(userObject)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login to the application</h1>
      <form onSubmit={formSubmit}>
        <div> username: <input id='username' type='text' value={username} onChange={handleUsernameChange} name='Username' autoComplete='on'/> </div>
        <div> password: <input id='password' type='password' value={password} onChange={handlePasswordChange} name='Password' autoComplete='on' /> </div>
        <button id='login-btn' type='submit'>Login!</button>
      </form>
    </div>
  )
}
export default Form
