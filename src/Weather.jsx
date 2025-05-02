import React, { useState } from "react";
import axios from "axios";
import "./weather.css";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!location) return;
    const apiKey = '27e73b58bc0915b469337c947a49c374';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      setWeather({
        temperature: data.main.temp,
        city: data.name,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        timezone: data.timezone / 3600,
      });
    } catch (error) {
      alert("City not found or API error");
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter the location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <button onClick={getWeather}>show weather</button>

      {weather && (
        <div className="weather-info">
          <p>TEMPERATURE: {weather.temperature}°C</p>
          <p>CITY NAME: {weather.city}</p>
          <p>PRESSURE: {weather.pressure}N/m²</p>
          <p>WIND: {weather.wind}m/s</p>
          <p>HUMIDITY: {weather.humidity}%</p>
          <p>
            TIME ZONE: {weather.timezone > 0 ? "+" : ""}
            {weather.timezone} UTC
          </p>
        </div>
      )}
    </div>
  );
}




