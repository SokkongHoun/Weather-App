let weatherData;
let showContainer = document.querySelector(".card");
const inputCity = document.querySelector(".js-inputCity");
const mainContainer = document.querySelector(".mainContainer");

function cityHandling() {
  let inputValue = inputCity.value;
  return inputValue;
}

const searchBTN = document.querySelector(".js-search-btn");
searchBTN.addEventListener("click", () => {
  const city = cityHandling();
  getResponse(city);
  if (!city) {
    mainContainerContainer.style.display = "none";
  } else {
    showContainer.classList.add("show-Container");
  }
  inputCity.value = "";
});

async function getResponse(city) {
  const weatherKey = "a35492532164bbc10187e5c49ceebc6b";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    weatherData = await response.json();
  } catch (error) {
    console.error(`${alert("Please input the correct city name")}`, error);
  }
  weatherDataController(weatherData);
  weatherImageController(weatherData);
  console.log(weatherData);
  console.log(weatherData.weather[0].main);
}

function weatherDataController(weatherData) {
  document.querySelector(
    ".humidity"
  ).innerHTML = `${weatherData.main.humidity}%`;
  document.querySelector(".city").innerHTML = `${weatherData.name}`;
  document.querySelector(".temp").innerHTML = `${Math.round(
    weatherData.main.temp
  )}°C`;
  document.querySelector(".wind").innerHTML = `${Math.round(
    weatherData.wind.speed
  )} Km/h`;
}

function weatherImageController(weatherData) {
  const weatherIconEl = document.querySelector(".weather-icon");
  if (weatherData.weather[0].main === "Clouds") {
    weatherIconEl.src = "images/weathericon/clouds.png";
  }
  if (weatherData.weather[0].main === "Drizzle") {
    weatherIconEl.src = "images/weathericon/drizzle.png";
  }
  if (weatherData.weather[0].main === "Rain") {
    weatherIconEl.src = "images/weathericon/rain.png";
  }
  if (weatherData.weather[0].main === "Snow") {
    weatherIconEl.src = "images/weathericon/snow.png";
  }
  if (weatherData.weather[0].main === "Mist") {
    weatherIconEl.src = "images/weathericon/mist.png";
  }
  if (weatherData.weather[0].main === "Clear") {
    weatherIconEl.src = "images/weathericon/clear.png";
  }
}
