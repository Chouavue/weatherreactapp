import React, { useState } from 'react';
import Videos from './components/Videos.mp4'

const apiKey = {
  key: "01e56457f20f3c38687160f7c4ff73bb",
  url : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [zip, setZip] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${apiKey.url}weather?zip=${zip}&units=imperial&APPID=${apiKey.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setZip('');
        });
    }
  }

  const dateBuilder = (d) => {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }

  const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const day = new Date()
  const year = day.getFullYear()
  const date = day.getDate()
  const monthName = months[day.getMonth()]
  const dayName = days[day.getDay()] 
  let time = new Date ().toLocaleTimeString();
    return `${dayName}, ${monthName} ${date} ${year} @ ${time}`

  }

  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <div className="ideo">
        <video autoPlay loop muted
        style={{
          position:"absolute",
          width:"100%",
          left: "50%",
          top: "50%",
          height:"100%",
          objectFit:"cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1"
        }}>
        <source src={Videos} type="video/mp4"></source>
        </video>
      </div>
        
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter Zipcode..."
            onChange={e => setZip(e.target.value)}
            value={zip}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="city-box">
            <div className="city">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            <div className="weather">{weather.weather[0].description}</div>
            <div className="weather">Temp Hi: {Math.round(weather.main.temp_max)}°F</div>
            <div className="weather">Temp Lo: {Math.round(weather.main.temp_min)}°F</div>
            <div className="weather">Humidity: {Math.round(weather.main.humidity)}°F</div>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;