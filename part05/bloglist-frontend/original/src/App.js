import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/user'
import Toggle from './components/Toggle'
import NewBlogForm from './components/NewBlogForm'
import SignUpForm from './components/SignUpForm'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notif, setNotif] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(b =>
      setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleFormSubmit = async (userObj) => {
    try {
      const user = await loginService.login(userObj)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      await blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUserFormSubmit = (userObj) => {
    userService.signUp(userObj).then(
      response => {
        loginFormRef.current.toggleVisibility()
        setNotif(`Account created! Username: ${response.username}. Kindly login with this username and your password.`)
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      }
    )
  }

  const blogSubmit = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
  }
  const handleDelete = async (blog) => {
    console.log(blog)
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }
  const handleLike = async (blog) => {
    const newBlog = {
      ...blog, likes: blog.likes + 1
    }
    const result = await blogService.update(blog.id, newBlog)
    setBlogs(blogs.map(b => b.id !== newBlog.id ? b : result))
  }

  const loggedIn = () =>
    <div> <h1>Blogs</h1>
      <b>{user.name}</b> is logged in.
      <button className='minorbutton' onClick={logout}>logout</button>
      <br /> <br />
      <div>
        <br />
        <Toggle buttonLabel='New Blog' ref={blogFormRef}> <NewBlogForm blogs={blogs} setBlogs={setBlogs} submit={blogSubmit} /> </Toggle>
      </div>
    </div>

  const form = () => (
    <div className='inlineclass'>
      <div>
        <Toggle buttonLabel='User Login' >
          <Form
            onSubmit={handleFormSubmit}
          />
        </Toggle>
      </div>
      <div>
        <Toggle buttonLabel='Sign Up' ref={loginFormRef} >
          <SignUpForm onSubmit={handleUserFormSubmit} />
        </Toggle>
      </div>
    </div>
  )

  return (
    <div className='container'>
      <div className='center'><h1>BlogList App</h1></div>
      <div className='messagearea'>
        <Notification notification={notif} />
        <Error error={errorMessage} />
      </div>
      <br />
      {user === null && form()}
      {user !== null && loggedIn()}
      <div>
        <h2>blogs</h2>
        {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1) && blogs.map(blog =>
          <Blog key={blog?.id} blog={blog} user={user} deleteButtonAction={handleDelete} likeButtonAction={handleLike} />
        )}
      </div>
    </div>
  )
}

export default App
