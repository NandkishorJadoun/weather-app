import clear from "/images/clear.svg";
import cloudy from "/images/cloudy.svg";
import fog from "/images/fog.svg";
import hail from "/images/hail.svg";
import humidity from "/images/humidity.svg";
import mist from "/images/mist.svg";
import wind from "/images/wind.svg";

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
  try {
    const data = await filteredData(city);
    const today = data.days[0];

    const errMsg = document.querySelector("#error-message");

    const address = document.querySelector("#address");
    const condition = document.querySelector("#condition");
    const conditionIcon = document.querySelector("#condition-icon");
    const temperature = document.querySelector("#temperature");
    const humidityIcon = document.querySelector("#humidity-icon");
    const humidityVal = document.querySelector("#humidity");
    const windIcon = document.querySelector("#wind-icon");
    const windVal = document.querySelector("#wind");

    errMsg.textContent = "";
    address.textContent = data.resolvedAddress;
    condition.textContent = today.conditions;
    conditionIcon.src = getIcon(today.conditions);
    temperature.textContent = `${today.temp} °F`;
    humidityIcon.src = humidity;
    humidityVal.textContent = `${today.humidity}%`;
    windIcon.src = wind;
    windVal.textContent = `${today.windspeed} km/hr`;
  } catch (error) {

    console.log("Display Error:", error);
    const errMsg = document.querySelector("#error-message");
    errMsg.textContent = `Can't`;
    
  }
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
