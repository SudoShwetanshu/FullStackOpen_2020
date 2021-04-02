import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [divVisibility, setDivVisibility] = useState(true)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const visibility = { display: (divVisibility) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const toggleVisible = () => {
    setDivVisibility(!divVisibility)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      toggleVisible
    }
  })

  Toggle.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div style={visibility}>
      <div style={hideWhenVisible}>
        <button className='btn' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button className='minorbutton' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Toggle
