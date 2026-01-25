import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid
} from "@mui/material";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        🌦 Weather App
      </Typography>

      <TextField
        fullWidth
        label="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        style={{ marginTop: "10px" }}
        onClick={fetchWeather}
      >
        Search
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {weather && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h5">
              {weather.city}, {weather.country}
            </Typography>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="icon"
            />
            <Typography>🌡 Temp: {weather.temperature} °C</Typography>
            <Typography>🤒 Feels Like: {weather.feels_like} °C</Typography>
            <Typography>☁ {weather.condition}</Typography>
            <Typography>💧 Humidity: {weather.humidity}%</Typography>
            <Typography>🌬 Wind: {weather.wind} m/s</Typography>

            <Typography variant="h6" style={{ marginTop: "15px" }}>
              📅 Forecast
            </Typography>

            <Grid container spacing={1}>
              {weather.forecast.map((f, i) => (
                <Grid item xs={4} key={i}>
                  <Typography>{f.date}</Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${f.icon}.png`}
                    alt=""
                  />
                  <Typography>{f.temp}°C</Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
