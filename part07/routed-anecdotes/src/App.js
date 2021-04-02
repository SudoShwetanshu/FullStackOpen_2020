import React, { useState } from 'react'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import useField from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link> </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>

  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."
    </em>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset='' />
        </div>
        <div>
          author
          <input {...author} reset='' />
        </div>
        <div>
          url for more info
          <input {...info} reset='' />
        </div>
        <button>create</button> <button onClick={(e) => { e.preventDefault(); content.reset(); author.reset(); info.reset() }}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/')
    setNotification(`a new anecdote "${anecdote.info} was created!"`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = async (id) => {
    const anecdote = await anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification !== '' && notification}
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} vote={vote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
