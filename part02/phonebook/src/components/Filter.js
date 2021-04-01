import React from 'react'
const Filter = ({ value, onChange }) => {
  return (
    <div>
      <p className='filterText'>Filter shown with &nbsp;
        <input value={value} onChange={onChange} />
      </p>
    </div>
  )
}

export default Filter
