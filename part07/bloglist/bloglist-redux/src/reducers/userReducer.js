import userService from '../services/user'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return [...state, state.payload.data]
    case 'INIT_USERS_LIST':
      return action.payload.data
    default:
      return state
  }
}

export const signUp = ({ username, name, password }) => {
  return async dispatch => {
    const details = { username: username, name: name, password: password }
    const result = userService.signUp(details)
    dispatch({
      type: 'SIGN_UP',
      payload: {
        data: result
      }
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const userArray = await userService.getAll()
    dispatch({
      type: 'INIT_USERS_LIST',
      payload: {
        data: userArray
      }
    })
  }
}

export default reducer
