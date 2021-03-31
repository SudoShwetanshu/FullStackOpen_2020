import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const [hasMaxVoted, setHasMaxVoted] = useState(false)


  const random =() => {
    const number = Math.floor(Math.random() * 6);
    setSelected(number)
  }
  const upvote = () => {
    const copy = [...votes] 
    copy[selected] += 1
    setVotes(copy)
    setHasMaxVoted(true)
  }

  const Heading = ({text}) => <h1>{text}</h1>

  const maxVoted = () => {
    return votes.indexOf(Math.max(...votes))
  }
    
  

  return ( <>
    <div>
      <Heading text="Anecdote of the day"/>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes.
      <br />
      <button onClick={upvote}>Vote</button>
    <button onClick={random}>next anecdote</button>
    </div>
    <div>
    <Heading text="Anecdote with most votes" />
     {hasMaxVoted && anecdotes[maxVoted()]}
     {!hasMaxVoted && "Votes please"}
    </div>
    
  </> )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
