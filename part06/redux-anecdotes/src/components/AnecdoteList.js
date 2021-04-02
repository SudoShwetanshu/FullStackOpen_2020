import React from 'react'
/* import { useSelector, useDispatch } from 'react-redux' */
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from './../reducers/notifReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  /* const anecdotes = useSelector(state => state.filter === '' ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
*/
  /* const anecdotes = () =>
    props.filter === '' ? props.anecdotes
    : props.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase())) */

  // my hooks code before implementing connect

  /* const dispatch = useDispatch() */

  const voteAnecdote = (anecdote) => {
    props.vote(anecdote)
    props.setNotification(`You voted ${anecdote.content}!`, 5)
  }

  const sorted = props.anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div style={{ color: 'red', fontSize: '18px' }}> {anecdote.content} </div>
          <div> has {anecdote.votes}  <button onClick={() => voteAnecdote(anecdote)}>vote</button> </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
/*  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }  */
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification,
  vote
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList
