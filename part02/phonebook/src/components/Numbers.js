import React from 'react'

const Numbers = ({ persons, deletePerson }) => {
  return (
    <div>
      <div> <h2> Numbers </h2> </div>
      {persons.map((person) =>
        <li className='numbers' key={person.id}>  {person.name + '              ' + person.number} &nbsp;
          <button className='btn' onClick={() => deletePerson(person)}> Delete </button>
        </li>)}
    </div>
  )
}
export default Numbers
