import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
        name: <input type='text' value={props.value} onChange={props.onChange} required />
        </div>
        <div>
        number: <input type='text' value={props.numbervalue} onChange={props.onChangeNumber} required />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
