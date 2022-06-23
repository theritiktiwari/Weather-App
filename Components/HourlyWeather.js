import React from 'react';
import moment from 'moment-timezone';
import Image from 'next/image';

const HourlyWeather = ({ hourlyWeather, timezone }) => {
    return (
        <>
            <div className="hourly">
                {hourlyWeather.length > 0 && hourlyWeather.map((weather, index) => (
                    <div className='box' key={weather.dt}>
                        <span>{weather.temp.toFixed(0)}&deg;C</span>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            width="100"
                            height="100" />
                        <span className={`time ${index == 0 ? 'time-now' : ""}`}>
                            {index == 0 ? "NOW" : moment.unix(weather.dt).tz(timezone).format("LT")}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HourlyWeather