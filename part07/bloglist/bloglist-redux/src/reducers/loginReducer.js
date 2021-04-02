import blogService from '../services/blogs'
import loginService from '../services/login'
import { setError } from './errorReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.payload.data
    case 'REMOVE_USER':
      return initialState
    default:
      return state
  }
}

export const getLoggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({
        type: 'INIT_USER',
        payload: {
          data: user
        }
      })
      blogService.setToken(user.token)
    }
  }
}

export const login = (userObj) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObj)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(getLoggedInUser())
      await blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setError('Wrong Credentials'))
    }
  }
}

export const logoutUser = (userObj) => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default reducer
