
export const clearError = () => {
  return {
    type: 'REM_ERR'
  }
}

let t = 0
export const setError = (error) => {
  return async dispatch => {
    clearTimeout(t)
    dispatch(clearError())
    dispatch({
      type: 'SET_ERR',
      payload: { error: `${error}` }
    })
    t = setTimeout(() => dispatch(clearError()), 5000)
  }
}

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERR':
      return action.payload.error
    case 'REM_ERR':
      return initialState
    default:
      return state
  }
}

export default reducer
