import React from 'react'

const Header = ({ name }) => {
  return <h2> {name} </h2>
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  const partsArray = parts.map((p) => <Part key={p.id} name={p.name} exercises={p.exercises} /> ) 
  const emptyArray = partsArray.length ? false : true
  return (
    <div>
      {emptyArray && <p>This course doesn't have any parts yet.</p>}
      {!emptyArray && partsArray}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, part) => s + part.exercises, 0)
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course