import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
/* import anecdoteService from './services/anecdotes'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer' */

/* anecdoteService.getAll().then(anecdotes => store.dispatch(initializeAnecdotes(anecdotes))) */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
