"use strict";
const searchInput = document.querySelector(".input-form");
const searchBtn = document.querySelector(".search-container--input-btn");
const weatherTemp = document.querySelector(".temp");
const countryCity = document.querySelector(".city");
const windSpeed = document.querySelector(".windspeed");
const humidityPercentage = document.querySelector(".humidity");
const  weatherTypeimg = document.querySelector(".weather-illustration-container-image");
const  closeErrMessage = document.querySelector(".close-message-container");
const  closeErrorBtn = document.querySelector(".close-icon");

closeErrorBtn.addEventListener("click",()=>{
  closeErrMessage.style.display="none"
})
// resetting values
weatherTemp.innerHTML = "---";
countryCity.innerHTML = "---";
windSpeed.innerHTML = "---";
humidityPercentage.innerHTML="---"
// Functions
function reset(weatherTemp,countryCity, windSpeed,humidityPercentage,weatherObj){
  weatherTemp.innerHTML = `${Math.round(weatherObj.temp)}°`;
  countryCity.innerHTML = weatherObj.city;
  windSpeed.innerHTML = `${weatherObj.windSpeed} km/h`;
  humidityPercentage.innerHTML = `${weatherObj.humidity}%`;

}
function settingImage(weatherObj, weatherTypeimg){
  if(weatherObj.weatherType === "Clouds"){
    weatherTypeimg.src="img/clouds.png"
  }
  else if(weatherObj.weatherType === "Rain"){
    weatherTypeimg.src="img/rain.png"
  }
  else if(weatherObj.weatherType === "snow"){
    weatherTypeimg.src="img/snow.png"
  }
  else if(weatherObj.weatherType === "Clear"){
    weatherTypeimg.src="img/clear.png"
  }
}
// get position
let latitude 
let longitude
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
         latitude = position.coords.latitude;
         longitude = position.coords.longitude;
         getWeatherSearch()
      }, function (error) {
        console.error("Error getting geolocation:", error);
      });
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }
  getLocation();
 
// click Event
let country = 'Abuja';
const apiKey = "3c6792811bf7f8cddf25779aa975ee61";
searchBtn.addEventListener("click", searchBtnClick);
function searchBtnClick() {
  country = searchInput.value;
  country = country[0].toUpperCase() + country.slice(1);
  async function getWeatherSearch() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("city not found");
      }
      const weatherData = await response.json();
      console.log(weatherData);
      const weatherObj = {
        city: weatherData.name,
        temp: Number(weatherData.main.temp)-273,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        weatherType: weatherData.weather[0].main,
      };
      reset(weatherTemp,countryCity, windSpeed,humidityPercentage,weatherObj);
      // setting image
      settingImage(weatherObj, weatherTypeimg);
      // make input search empty
      searchInput.value = "";
    } catch (error) {
      closeErrMessage.style.display = "block";
      searchInput.value = "";
    }
  }
  getWeatherSearch();
}
// Default setting
  async function getWeatherSearch() {
    try {
      console.log(latitude,longitude);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3c6792811bf7f8cddf25779aa975ee61&lang={lang}`
        );
      if (!response.ok) {
        throw new Error("city not found");
      }
      const weatherData = await response.json();
      const weatherObj = {
        city: weatherData.name,
        temp:Number(weatherData.main.temp)-273,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        weatherType: weatherData.weather[0].main,
      };
      // setting static Html value
      reset(weatherTemp,countryCity, windSpeed,humidityPercentage,weatherObj);
      // setting image
      settingImage(weatherObj, weatherTypeimg);
    } catch (error) {
      console.log(error);
    }
  }

  
