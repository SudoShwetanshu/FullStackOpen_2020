import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Users from './components/Users'
import Form from './components/Form'
import blogService from './services/blogs'
import userService from './services/user'
import Toggle from './components/Toggle'
import NewBlogForm from './components/NewBlogForm'
import SignUpForm from './components/SignUpForm'
import Notification from './components/Notification'
import Error from './components/Error'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setNotification } from './reducers/notifReducer'
import { setError } from './reducers/errorReducer'
import { getLoggedInUser, logoutUser, login } from './reducers/loginReducer'

import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'
import AllBlogs from './components/AllBlogs'
import User from './components/User'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const [comment, setComment] = useState(null)
  const loggedInUser = useSelector(state => state.login)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchedBlog = matchBlog ? blogs.find(blog => blog.id === (matchBlog.params.id)) : null

  const matchUser = useRouteMatch('/users/:id')
  const matchedUser = matchUser ? users.find(user => user.id === (matchUser.params.id)) : null

  const handleFormSubmit = async (userObj) => {
    dispatch(login(userObj))
  }

  const logout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  const handleUserFormSubmit = async (userObj) => {
    try {
      const response = await userService.signUp(userObj)
      loginFormRef.current.toggleVisibility()
      dispatch(setNotification(`Account created! Username: ${response.username}. Kindly login with this username and your password.`))
    } catch (exception) {
      dispatch(setError(`${exception.response.data.error}`))
    }
  }

  const blogSubmit = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }
  const handleDelete = async (blog) => {
    dispatch(deleteBlog(blog))
  }
  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const x = await blogService.comment(comment, matchedBlog.id)
    console.log(x)
    setComment('')
  }

  const loggedIn = () =>
    <div>
      <b>{loggedInUser.name}</b> is logged in.
      <button className='minorbutton' onClick={logout}>logout</button>
      <br /> <br />
      <div>
        <br />
        <Toggle buttonLabel='New Blog' ref={blogFormRef}> <NewBlogForm blogs={blogs} submit={blogSubmit} /> </Toggle>
      </div>
    </div>

  const form = () => (
    <div className='inlineclass'>
      <div className='marginr'>
        <Toggle buttonLabel='User Login'>
          <Form
            onSubmit={handleFormSubmit}
          />
        </Toggle>
      </div>
      <div className='marginl'>
        <Toggle buttonLabel='Sign Up' ref={loginFormRef}>
          <SignUpForm onSubmit={handleUserFormSubmit} />
        </Toggle>
      </div>
    </div>
  )

  const singleBlog = () => (
    <div>
      <h2>{matchedBlog.title}</h2>
      <a href={`//${matchedBlog.url}`} rel='noopener noreferrer' target='_blank'>{matchedBlog.url}</a>
      <div>
        has <strong>{matchedBlog.likes}</strong>  likes <button onClick={() => dispatch(likeBlog(matchedBlog))}>like</button>
      </div>
      added by {matchedBlog.user.username}
      <br /> <br /> <br />
      <h3><strong>Comments(anonymous):</strong></h3>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button>submit</button>
      </form>
      {matchedBlog.comments.map(comment =>
        <li key={comment}>{comment}</li>
      )}
    </div>
  )

  return (
    <div className='containerprimary'>

      <Navigation className='containernav' />
      <h1>Blogs</h1>
      <br />
      <div className='messagearea'>
        <Notification />
        <Error />
      </div>
      <div className='toggles'>
        <div>
          {loggedInUser === null && form()}
        </div>
        <div>
          {loggedInUser !== null && loggedIn()}
        </div>
        <br />
        <br /> <br /> <br />
      </div>
      <Switch>
        <Route path='/blogs/:id'>
          {matchedBlog && singleBlog()}
        </Route>
        <Route path='/blogs'>
          <div>
            <AllBlogs />
          </div>
        </Route>
        <Route path='/users/:id'>
          <User user={matchedUser} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <div>
            <h2>blogs</h2>
            {blogs.sort((a, b) => a.likes > b.likes ? -1 : 1) && blogs.map(blog =>
              <Blog key={blog?.id} blog={blog} user={loggedInUser} deleteButtonAction={handleDelete} likeButtonAction={handleLike} />
            )}
          </div>
        </Route>
      </Switch>
      <br />
    </div>
  )
}

export default App
