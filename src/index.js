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

    const { resolvedAddress, days } = unfilteredData;

    return { resolvedAddress, days };
  } catch (error) {
    console.log("Filtering Error: ", error);
  }
}

async function displayWeather(city) {
  const data = await filteredData(city);
  const today = data.days[0];

  const address = document.querySelector("#address");
  const condition = document.querySelector("#condition");
  const conditionIcon = document.querySelector("#condition-icon");
  const temperature = document.querySelector("#temperature");
  const subContainer = document.querySelector("#sub-container");
  const moistureIcon = document.querySelector("#moisture-icon");
  const moisture = document.querySelector("#moisture");
  const windIcon = document.querySelector("#wind-icon");
  const wind = document.querySelector("#wind");

  
}

const getWeatherBtn = document.querySelector("#get-weather");

displayWeather("london");
