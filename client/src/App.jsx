import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );

      const forecastRes = await axios.get(
        `http://localhost:5000/api/weather/forecast/${city}`
      );

      const dailyData = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(response.data);
      setForecast(dailyData.slice(0, 5));
    } catch {
      alert("City not found");
    }
  };

  return (
    <div className="app">
      <div className="weather-box">
        <h1>☁️ Weather<span>Vision</span></h1>
        <p className="subtitle">AI Powered Weather Forecasting System</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {weather && (
          <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <div className="temp-section">
              <h3>{Math.round(weather.main.temp)}°C</h3>
              <p className="desc">{weather.weather[0].description}</p>
            </div>

            <div className="details">
              <div>
                <span>Humidity</span>
                <b>{weather.main.humidity}%</b>
              </div>
              <div>
                <span>Wind</span>
                <b>{weather.wind.speed} m/s</b>
              </div>
              <div>
                <span>Pressure</span>
                <b>{weather.main.pressure} hPa</b>
              </div>
            </div>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast-section">
            <h2>5 Day Forecast</h2>

            <div className="forecast-grid">
              {forecast.map((day, index) => (
                <div className="forecast-card" key={index}>
                  <h4>
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h4>

                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="weather"
                  />

                  <h3>{Math.round(day.main.temp)}°C</h3>
                  <p>{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;