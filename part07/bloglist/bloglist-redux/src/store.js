import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notifReducer from './reducers/notifReducer'
import errorReducer from './reducers/errorReducer'
import commentReducer from './reducers/commentReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notifReducer,
  error: errorReducer,
  comments: commentReducer,
  login: loginReducer /*
  trigger: triggerReducer */
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
