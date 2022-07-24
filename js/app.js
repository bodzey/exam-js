"use strict"

// Getting elements from DOM

const weatherWidget = document.querySelector('#weatherWidget');
const currentTemp = document.querySelector('#currentTemp');
const currentFeelsLikeTemp = document.querySelector('#currentFeelsLikeTemp');
const currentWeatherStatus = document.querySelector('#currentWeatherStatus');
const currentWeatherSunrise = document.querySelector('#currentWeatherSunrise');
const currentWeatherSunset = document.querySelector('#currentWeatherSunset');
const currentWeatherDuration = document.querySelector('#currentWeatherDuration')
const currentDate = document.querySelector('#currentDate');
const currentWeatherIcon = document.querySelector('#currentWeatherIcon')
const currentCity = document.querySelector('#currentCity');

// Getting now date

const nowDate = new Date().toLocaleDateString();



// Getting API call
async function loadWeather(e) {

	// const server = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}units=metric&appid=9c485f79c586d7a9e9c5664db72a0320`;
	const server = `https://api.openweathermap.org/data/2.5/weather?q=Rivne&units=metric&appid=9c485f79c586d7a9e9c5664db72a0320`;
	const response = await fetch(server, {
		method: 'GET',
	});
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult);
	} else {
		console.log(responseResult.message);
	}

}

// Getting parameters from API and work with DOM

function getWeather(data) {

	const city = data.name;
	const country = data.sys.country;
	const location = `${city}, ${country}`;
	const temp = Math.round(data.main.temp);
	const feelsLikeTemp = Math.round(data.main.feels_like);
	const weatherStatus = data.weather[0].main;
	const weatherIconId = data.weather[0].icon;
	const sunrise = new Date(data.sys.sunrise * 1000).getHours() + ":" + new Date(data.sys.sunrise * 1000).getMinutes();
	const sunset = new Date(data.sys.sunset * 1000).getHours() + ":" + new Date(data.sys.sunset * 1000).getMinutes();


	let getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
	let different = (getDate(sunset) - getDate(sunrise));

	let hours = Math.floor((different % 86400000) / 3600000);
	let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
	let duration = `${hours}:${minutes} hours`;

	console.log(duration);



	currentCity.innerHTML = location;
	currentWeatherStatus.innerHTML = weatherStatus;
	currentWeatherIcon.innerHTML = `<img src=./img/icons/${weatherIconId}@2x.png alt="${weatherStatus}" id="currentWeatherImg">`;
	currentTemp.innerHTML = `${temp} °C`;
	currentFeelsLikeTemp.innerHTML = `Real feel: ${feelsLikeTemp} °C`;
	currentDate.innerHTML = nowDate;
	currentWeatherSunrise.innerHTML = sunrise;
	currentWeatherSunset.innerHTML = sunset;
	currentWeatherDuration.innerHTML = duration;


	console.log(data);
}

loadWeather();
