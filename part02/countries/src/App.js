import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import Country from './components/Country'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ country, setCountry ] = useState('')
  const [filter, setFilter] = useState(false)
  const [weatherData, setWeatherData] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    if (event.target.value === "") {
      setFilter(false)
    } else {
      setFilter(true)
    }
  }

  const filteredCountries = countries.filter(
     c => {
       return c.name.toLowerCase().includes(country.toLocaleLowerCase())
     }
  )

  const exactMatch = countries.some(
    c => c.name.toLowerCase() === country.toLocaleLowerCase()
  )



  let exactCountry
  if(exactMatch) {
    exactCountry = filteredCountries.filter(c => 
      c.name.toLowerCase() === country.toLocaleLowerCase()
    )
  }

  const show = (c) => {
    setCountry(c.target.id)
  }

 return (
    <div>
      <h2>Country</h2>
      <CountryFilter value={country} onChange={handleCountryChange} />
      {filter && exactMatch && <Country country={exactCountry[0]} /> }
      
      {filter && !exactMatch && <Countries countries={filteredCountries} setCountry={(event) => show(event)} />}



    </div>
  )
}

export default App