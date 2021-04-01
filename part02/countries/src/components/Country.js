import React, {useState, useEffect} from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = ({country}) => {
  const [weatherData, setWeatherData] = useState(null)


  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
         .then(response => setWeatherData((response.data)))
         
}, [])
    

    
    return ( 
            <div>
              <div>
                <h1>{country.name}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
              </div>
              <div>
                <h2>Spoken Languages</h2>
                <p>{country.languages.map(l => <li key={l.name}>{l.name}</li>)}</p>
              </div> 
              <img src={country.flag} height={'225px'} width={'400px'} />

              <Weather weatherData={weatherData} />
                
            </div >
    
    )
}

export default Country