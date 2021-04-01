import React from 'react'
import Country from "./Country";

const Countries = ({countries, setCountry}) => {

  const many = countries.length > 10
  const atleastTen = countries.length > 1 && countries.length <= 10
  
  

  return (
    <div>
      {many && "enter more"}
      {atleastTen && countries.map(c => <div key={c.name}>{c.name} <button onClick={setCountry} id={c.name} >show</button> </div>)}
    </div>
  )
  
}

  export default Countries