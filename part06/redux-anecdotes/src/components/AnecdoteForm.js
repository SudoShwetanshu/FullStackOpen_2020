import React from 'react'
/* import { useDispatch } from 'react-redux' */
import { createAnecdote } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'
/* import anecdoteService from '../services/anecdotes' */

const AnecdoteForm = (props) => {
  /* const dispatch = useDispatch() */

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.name.value
    event.target.name.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2> create new </h2>
      <form onSubmit={newAnecdote}>
        <div><input name='name' /></div>
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

const connectedAnecdoteForm = connect(null, { createAnecdote })(AnecdoteForm)

export default connectedAnecdoteForm
