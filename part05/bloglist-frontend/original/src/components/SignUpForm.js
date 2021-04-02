import React, { useState } from 'react'

const SignUpForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const formSubmit = (event) => {
    event.preventDefault()
    const userObject = { username, name, password }
    onSubmit(userObject)
    setUsername('')
    setPassword('')
    setName('')
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={formSubmit}>
        <div> username: <input type='text' value={username} onChange={handleUsernameChange} name='Username' autoComplete='on'/> </div>
        <div> name: <input type='text' value={name} onChange={handleNameChange} name='Name' autoComplete='on'/> </div>
        <div> password: <input type='password' value={password} onChange={handlePasswordChange} name='Password' autoComplete='on' /> </div>
        <button type='submit'>Create Account</button>
      </form>
    </div>
  )
}
export default SignUpForm
