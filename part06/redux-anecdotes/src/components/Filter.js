import React from 'react'
import { setFilter } from '../reducers/filterReducer'
/* import { useDispatch } from 'react-redux' */
import { connect } from 'react-redux'

const Filter = (props) => {
/* const dispatch = useDispatch() */

  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type='text' onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }

const connectedFilter = connect(null, mapDispatchToProps)(Filter)

export default connectedFilter
