import clear from "/images/clear.svg";
import cloudy from "/images/cloudy.svg";
import fog from "/images/fog.svg";
import hail from "/images/hail.svg";
import humidity from "/images/humidity.svg";
import mist from "/images/mist.svg";
import wind from "/images/wind.svg";
import loading from "/images/loading.svg";

import "./styles.css";

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=L7YWDGPEDJL3W88G8AGWWRW42`,
      {
        mode: "cors",
      },
    );

    const weatherData = await response.json();

    return weatherData;
  } catch (error) {
    console.log("Getting Weather Data Error: ", error);
  }
}

async function filteredData(city) {
  try {
    const unfilteredData = await getWeatherData(city);
    console.log(unfilteredData);
    const { resolvedAddress, days } = unfilteredData;

    return { resolvedAddress, days };
  } catch (error) {
    console.log("Filtering Error: ", error);
  }
}

async function displayWeather(city) {
  const loadingScreen = document.querySelector("#loading-screen");
  const errMsg = document.querySelector("#error-message");
  const dataContainer = document.querySelector("#data-container");
  const address = document.querySelector("#address");
  const condition = document.querySelector("#condition");
  const conditionIcon = document.querySelector("#condition-icon");
  const temperature = document.querySelector("#temperature");
  const humidityIcon = document.querySelector("#humidity-icon");
  const humidityVal = document.querySelector("#humidity");
  const windIcon = document.querySelector("#wind-icon");
  const windVal = document.querySelector("#wind");

  loadingScreen.style.display = "block";
  loadingScreen.src = loading;

  errMsg.style.display = "none";
  dataContainer.style.display = "none";

  try {
    const data = await filteredData(city);
    const today = data.days[0];

    errMsg.textContent = "";
    errMsg.style.display = "none";
    dataContainer.style.display = "block";
    address.textContent = data.resolvedAddress;
    condition.textContent = today.conditions;
    conditionIcon.src = getIcon(today.conditions);
    temperature.textContent = `${convertToCelcius(today.temp)} °C`;
    humidityIcon.src = humidity;
    humidityVal.textContent = `${today.humidity}%`;
    windIcon.src = wind;
    windVal.textContent = `${today.windspeed} km/hr`;
  } catch (error) {

    console.log("Display Error:", error);
    errMsg.style.display = "block";
    errMsg.textContent = `Can't find weather for ${city}`;
    dataContainer.style.display = "none";
    
  } finally {
    loadingScreen.style.display = "none";
  }
}

function convertToCelcius(temp) {
  return Math.floor(((temp - 32) * 5) / 9);
}

function getIcon(condition) {
  const iconMap = {
    Clear: clear,
    Sunny: clear,
    Cloudy: cloudy,
    "Partially cloudy": cloudy,
    "Snow, Overcast": cloudy,
    Overcast: cloudy,
    Fog: fog,
    Mist: mist,
    Hail: hail,
  };

  return iconMap[condition] || clear;
}

function inputCity() {
  const cityName = document.querySelector("#city-name");
  const getWeatherBtn = document.querySelector("#get-weather");

  getWeatherBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!cityName.value) {
      return;
    }
    await displayWeather(cityName.value);
  });
}

inputCity();
