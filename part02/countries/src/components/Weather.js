import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({weatherData}) => {

    return( <>
        <div>
          <h2>{`Weather in ${weatherData?.location?.name}`}</h2>
        </div>
        <div> {`temperature: ${(weatherData?.current?.temperature)}` }
        <br />
        <img src={weatherData?.current?.weather_icons} /> 
        <br />
        {`wind: ${weatherData?.current?.wind_speed} mph direction ${weatherData?.current?.wind_dir}`}
            
        </div> </>
    )
}

export default Weather
