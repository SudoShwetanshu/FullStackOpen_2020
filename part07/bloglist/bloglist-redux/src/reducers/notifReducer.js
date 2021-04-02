
export const clearNotification = () => {
  return {
    type: 'REM_NOTIF'
  }
}

let t = 0
export const setNotification = (notification) => {
  return async dispatch => {
    clearTimeout(t)
    dispatch(clearNotification())
    dispatch({
      type: 'SET_NOTIF',
      payload: { notification: `${notification}` }
    })
    t = setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.payload.notification
    case 'REM_NOTIF':
      return initialState
    default:
      return state
  }
}

export default reducer
