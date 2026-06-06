const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/forecast/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Forecast data not found"
    });
  }
});

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "City not found or API error" });
  }
});

module.exports = router;