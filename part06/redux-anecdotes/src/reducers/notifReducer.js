
export const clearNotification = () => {
  return {
    type: 'REMOVE'
  }
}

let t = 0
export const setNotification = (notification, time) => {
  return async dispatch => {
    const timeout = +1000 * +time
    clearTimeout(t)
    dispatch(clearNotification())
    dispatch({
      type: 'SET',
      notification: `${notification}`
    })
    t = setTimeout(() => dispatch(clearNotification()), timeout)
  }
}
const initialState = ''

const notifReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.notification
    case 'REMOVE':
      return initialState
    default:
      return state
  }
}

export default notifReducer
