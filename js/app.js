"use strict"

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
const textInput = document.querySelector('#headerSearch');
const currentWeather = document.querySelector('#currentWeather')
const hourlyWeather = document.querySelector('#hourlyWeather')
const form = document.querySelector('form');
const nowDate = new Date().toLocaleDateString();


const link = 'https://api.openweathermap.org/data/2.5/'
const apiCurrent = 'weather'
const apiHourly = 'forecast'
const apiKey = '9c485f79c586d7a9e9c5664db72a0320'


let currentWeatherData = {
	city: 'Rivne',
	temp: 0,
	feelsLike: 0,
	sunrise: 0,
	sunset: 0,
	country: '',
	icon: '',
	descriptionWeather: ''
};

let hourlyWeatherData = {
	firstHourDate: 0,
	firstHourTemp: 0,
	firstHourTempFeelsLike: 0,
	firstHourWeatherStatus: '',
	firstHourWeatherIcon: '',
	firstHourWindSpeed: 0,

	secondHourDate: 0,
	secondHourTemp: 0,
	secondHourTempFeelsLike: 0,
	secondHourWeatherStatus: '',
	secondHourWeatherIcon: '',
	secondHourWindSpeed: 0,

	thirdHourDate: 0,
	thirdHourTemp: 0,
	thirdHourTempFeelsLike: 0,
	thirdHourWeatherStatus: '',
	thirdHourWeatherIcon: '',
	thirdHourWindSpeed: 0,

	fourthHourDate: 0,
	fourthHourTemp: 0,
	fourthHourTempFeelsLike: 0,
	fourthHourWeatherStatus: '',
	fourthHourWeatherIcon: '',
	fourthHourWindSpeed: 0,

	fifthHourDate: 0,
	fifthHourTemp: 0,
	fifthHourTempFeelsLike: 0,
	fifthHourWeatherStatus: '',
	fifthHourWeatherIcon: '',
	fifthHourWindSpeed: 0,

	sixthHourDate: 0,
	sixthHourTemp: 0,
	sixthHourTempFeelsLike: 0,
	sixthHourWeatherStatus: '',
	sixthHourWeatherIcon: '',
	sixthHourWindSpeed: 0,
};

let getGeolocation = () => {
	let options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		let crd = pos.coords;

		localStorage.setItem('lat', crd.latitude);
		localStorage.setItem('lon', crd.longitude);
	};

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	};

	navigator.geolocation.getCurrentPosition(success, error, options);
};

const fetchDataCurrent = async (request = 'Kyiv') => {
	try {
		const city = localStorage.getItem('city') || request;
		const result = await fetch(`${link}${apiCurrent}?&q=${city}&units=metric&appid=${apiKey}`);
		const data = await result.json();

		if (!result.ok) {
			console.log('error')
		};

		console.log('Current', data);

		const {
			name,
			main: {
				temp,
				feels_like: feelsLike
			},
			sys: {
				sunrise,
				sunset,
				country
			},
			weather: {
				0: {
					description: descriptionWeather,
					icon
				},
			},
		} = data;

		currentWeatherData = {
			...currentWeatherData,
			city: name,
			temp,
			feelsLike,
			sunrise,
			sunset,
			country,
			icon,
			descriptionWeather
		};

		currentWeatherData.temp = Math.round(currentWeatherData.temp);
		currentWeatherData.feelsLike = Math.round(currentWeatherData.feelsLike);
		currentWeatherData.descriptionWeather = (currentWeatherData.descriptionWeather).split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

		showWeather();
	} catch (err) {
		console.log(err);
	};
};

const fetchDataHourly = async (request = 'Kyiv') => {
	try {
		const city = localStorage.getItem('city') || request;
		const result = await fetch(`${link}${apiHourly}?&q=${city}&units=metric&cnt=6&appid=${apiKey}`);
		let data = await result.json();
		data = data.list;

		if (!result.ok) {
			console.log('error');
		};

		let firstHour = new Object(data[0]);
		let secondHour = new Object(data[1]);
		let thirdHour = new Object(data[2]);
		let fourthHour = new Object(data[3]);
		let fifthHour = new Object(data[4]);
		let sixthHour = new Object(data[5]);

		let hourlyWeatherObject = {
			firstHour,
			secondHour,
			thirdHour,
			fourthHour,
			fifthHour,
			sixthHour
		}
		data = hourlyWeatherObject;

		console.log('Hourly: ', data);

		const {

			firstHour: {
				dt: firstHourDate,
				main: {
					temp: firstHourTemp,
					feels_like: firstHourTempFeelsLike,
				},
				weather: {
					0: {
						main: firstHourWeatherStatus,
						icon: firstHourWeatherIcon,
					},
				},
				wind: {
					speed: firstHourWindSpeed,
				},
			},

			secondHour: {
				dt: secondHourDate,
				main: {
					temp: secondHourTemp,
					feels_like: secondHourTempFeelsLike,
				},
				weather: {
					0: {
						main: secondHourWeatherStatus,
						icon: secondHourWeatherIcon,
					},
				},
				wind: {
					speed: secondHourWindSpeed,
				},
			},

			thirdHour: {
				dt: thirdHourDate,
				main: {
					temp: thirdHourTemp,
					feels_like: thirdHourTempFeelsLike,
				},
				weather: {
					0: {
						main: thirdHourWeatherStatus,
						icon: thirdHourWeatherIcon,
					},
				},
				wind: {
					speed: thirdHourWindSpeed
				},
			},

			fourthHour: {
				dt: fourthHourDate,
				main: {
					temp: fourthHourTemp,
					feels_like: fourthHourTempFeelsLike,
				},
				weather: {
					0: {
						main: fourthHourWeatherStatus,
						icon: fourthHourWeatherIcon,
					},
				},
				wind: {
					speed: fourthHourWindSpeed,
				},
			},

			fifthHour: {
				dt: fifthHourDate,
				main: {
					temp: fifthHourTemp,
					feels_like: fifthHourTempFeelsLike,
				},
				weather: {
					0: {
						main: fifthHourWeatherStatus,
						icon: fifthHourWeatherIcon,
					},
				},
				wind: {
					speed: fifthHourWindSpeed,
				},
			},

			sixthHour: {
				dt: sixthHourDate,
				main: {
					temp: sixthHourTemp,
					feels_like: sixthHourTempFeelsLike,
				},
				weather: {
					0: {
						main: sixthHourWeatherStatus,
						icon: sixthHourWeatherIcon,
					},
				},
				wind: {
					speed: sixthHourWindSpeed,
				},
			},

		} = data

		hourlyWeatherData = {
			...hourlyWeatherData,
			firstHourDate,
			firstHourTemp,
			firstHourTempFeelsLike,
			firstHourWeatherStatus,
			firstHourWeatherIcon,
			firstHourWindSpeed,

			secondHourDate,
			secondHourTemp,
			secondHourTempFeelsLike,
			secondHourWeatherStatus,
			secondHourWeatherIcon,
			secondHourWindSpeed,

			thirdHourDate,
			thirdHourTemp,
			thirdHourTempFeelsLike,
			thirdHourWeatherStatus,
			thirdHourWeatherIcon,
			thirdHourWindSpeed,

			fourthHourDate,
			fourthHourTemp,
			fourthHourTempFeelsLike,
			fourthHourWeatherStatus,
			fourthHourWeatherIcon,
			fourthHourWindSpeed,

			fifthHourDate,
			fifthHourTemp,
			fifthHourTempFeelsLike,
			fifthHourWeatherStatus,
			fifthHourWeatherIcon,
			fifthHourWindSpeed,

			sixthHourDate,
			sixthHourTemp,
			sixthHourTempFeelsLike,
			sixthHourWeatherStatus,
			sixthHourWeatherIcon,
			sixthHourWindSpeed
		};

		showWeather();
	} catch (err) {
		console.log(err);
	};
};

const getRoundedValue = (value) => {
	value = Math.round(value);
	return value;
};

let timeFormater = (unixTime) => {
	let date = new Date(unixTime * 1000);
	let hours = date.getHours().toString();
	let minutes = date.getMinutes().toString();

	if (hours.length == 2) {
		hours = hours;
	} else {
		hours = '0'.concat(hours)
	};

	if (minutes.length == 2) {
		minutes = minutes;
	} else {
		minutes = '0'.concat(minutes);
	};

	let time = hours + ':' + minutes;
	return time;
};

let secondsToTime = i => {
	let hours = 0,
		minutes = 0,
		seconds = 0;
	if (i / 3600 >= 1) {
		hours = Math.floor(i / 3600);
		i -= hours * 3600;
	};
	if (hours < 10) hours = `0${hours}`;
	if (i / 60 >= 1) {
		minutes = Math.floor(i / 60);
		i -= minutes * 60;
	};
	if (minutes < 10) minutes = `0${minutes}`;
	seconds = i;
	if (seconds < 10) seconds = `0${seconds}`;
	return `${hours}:${minutes}`;
};

let timeToSeconds = (hours = 0, minutes = 0, seconds = 0) => {
	if (minutes > 60 || seconds > 60) return console.log("Something wrong!");
	else return hours * 3600 + minutes * 60 + seconds;
};

let timeInterval = (firstHours, firstMinutes, firstSeconds, secondHours, secondMinutes, secondSeconds) => {
	let firstDate = timeToSeconds(firstHours, firstMinutes, firstSeconds);
	let secondDate = timeToSeconds(secondHours, secondMinutes, secondSeconds);
	if (firstDate < secondDate) return secondsToTime(secondDate - firstDate);
	else return secondsToTime(firstDate - secondDate);
};

const layoutCurrent = () => {
	let sunriseDate = new Date(currentWeatherData.sunrise * 1000);
	let sunsetDate = new Date(currentWeatherData.sunset * 1000);
	let dayDuration = timeInterval(sunsetDate.getHours(), sunsetDate.getMinutes(), sunsetDate.getSeconds(), sunriseDate.getHours(), sunriseDate.getMinutes(), sunriseDate.getSeconds());

	return `
	<div class="current__top">
	<h2 class="block__tittle">Current Weather</h2>
	<h2 id="currentCity">${currentWeatherData.city}, ${currentWeatherData.country}</h2>
	<h2 id="currentDate">${nowDate}</h2>
	</div>

	<div class="current__body">

	<div class="current__status">
		<div id="currentWeatherIcon"><img src="./img/icons/${currentWeatherData.icon}@2x.png" alt="${currentWeatherData.descriptionWeather}" id="currentWeatherImg"></div>
		<h2 id="currentWeatherStatus">${currentWeatherData.descriptionWeather}</h2>
	</div>
	<div class="current__temp">
		<h2 id="currentTemp">${currentWeatherData.temp}&deg;C</h2>
		<h2 id="currentFeelsLikeTemp">Feels Like: ${currentWeatherData.feelsLike}&deg;C</h2>
	</div>
	<div class="current__sunset">
		<div class="divTable">
			<div class="divTableBody">
				<div class="divTableRow">
					<div class="divTableCell">Sunrise:</div>
					<div class="divTableCell" id="currentWeatherSunrise">${timeFormater(currentWeatherData.sunrise)}</div>
				</div>
				<div class="divTableRow">
					<div class="divTableCell">Sunset:</div>
					<div class="divTableCell" id="currentWeatherSunset">${timeFormater(currentWeatherData.sunset)}</div>
				</div>
				<div class="divTableRow">
					<div class="divTableCell">Duration:</div>
					<div class="divTableCell" id="currentWeatherDuration">${dayDuration}</div>
				</div>
			</div>
		</div>
	</div>
	</div>		
`
};

const layontHourly = () => {
	return `
	<h2 class="block__tittle">Hourly</h2>

	<div class="divTable">
		<div class="divTableBody">
			<div class="divTableRow">
				<div class="divTableCell">Time</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.firstHourDate)}</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.secondHourDate)}</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.thirdHourDate)}</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.fourthHourDate)}</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.fifthHourDate)}</div>
				<div class="divTableCell">${timeFormater(hourlyWeatherData.sixthHourDate)}</div>
			</div>
			<div class="divTableRow">
				<div class="divTableCell">&nbsp;</div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.firstHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.firstHourWeatherStatus}" id="currentWeatherImg"></div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.secondHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.secondHourWeatherStatus}" id="currentWeatherImg"></div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.thirdHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.thirdHourWeatherStatus}" id="currentWeatherImg"></div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.fourthHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.fourthHourWeatherStatus}" id="currentWeatherImg"></div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.fifthHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.fifthHourWeatherStatus}" id="currentWeatherImg"></div>
				<div class="divTableCell"><img src="./img/icons/${hourlyWeatherData.sixthHourWeatherIcon}@2x.png" alt="${hourlyWeatherData.sixthHourWeatherStatus}" id="currentWeatherImg"></div>
			</div>
			<div class="divTableRow">
				<div class="divTableCell">Forecast</div>
				<div class="divTableCell">${hourlyWeatherData.firstHourWeatherStatus}</div>
				<div class="divTableCell">${hourlyWeatherData.secondHourWeatherStatus}</div>
				<div class="divTableCell">${hourlyWeatherData.thirdHourWeatherStatus}</div>
				<div class="divTableCell">${hourlyWeatherData.fourthHourWeatherStatus}</div>
				<div class="divTableCell">${hourlyWeatherData.fifthHourWeatherStatus}</div>
				<div class="divTableCell">${hourlyWeatherData.sixthHourWeatherStatus}</div>

			</div >
			<div class="divTableRow">
				<div class="divTableCell">Temp</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.firstHourTemp)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.secondHourTemp)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.thirdHourTemp)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.fourthHourTemp)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.fifthHourTemp)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.sixthHourTemp)}&deg;C</div>
			</div>
			<div class="divTableRow">
				<div class="divTableCell">RealFeel</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.firstHourTempFeelsLike)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.secondHourTempFeelsLike)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.thirdHourTempFeelsLike)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.fourthHourTempFeelsLike)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.fifthHourTempFeelsLike)}&deg;C</div>
				<div class="divTableCell">${getRoundedValue(hourlyWeatherData.sixthHourTempFeelsLike)}&deg;C</div>
			</div>
			<div class="divTableRow">
				<div class="divTableCell">Wind</div>
				<div class="divTableCell">${hourlyWeatherData.firstHourWindSpeed} m/s</div>
				<div class="divTableCell">${hourlyWeatherData.secondHourWindSpeed} m/s</div>
				<div class="divTableCell">${hourlyWeatherData.thirdHourWindSpeed} m/s</div>
				<div class="divTableCell">${hourlyWeatherData.fourthHourWindSpeed} m/s</div>
				<div class="divTableCell">${hourlyWeatherData.fifthHourWindSpeed} m/s</div>
				<div class="divTableCell">${hourlyWeatherData.sixthHourWindSpeed} m/s</div>
			</div>
		</div >
	</div >
	`
};

const showWeather = () => {
	console.log(currentWeatherData)

	currentWeather.innerHTML = layoutCurrent();
	hourlyWeather.innerHTML = layontHourly();


};

const changeCity = (e) => {
	currentWeatherData = {
		...currentWeatherData,
		city: e.target.value,
	};
};

const submitChangeCity = (e) => {
	e.preventDefault();
	const value = currentWeatherData.city;

	if (!value) return null;
	localStorage.setItem('city', value);
	fetchDataCurrent();
	fetchDataHourly();
};

form.addEventListener('submit', submitChangeCity);
textInput.addEventListener('input', changeCity)

fetchDataCurrent();
fetchDataHourly();

























































































// let data = {};
// console.log(data)

// // Getting geolocation
// function getGeolocation() {
// 	let options = {
// 		enableHighAccuracy: true,
// 		timeout: 5000,
// 		maximumAge: 0
// 	};

// 	function success(pos) {
// 		let crd = pos.coords;

// 		localStorage.setItem('lat', crd.latitude);
// 		localStorage.setItem('lon', crd.longitude);
// 	};

// 	function error(err) {
// 		console.warn(`ERROR(${ err.code }): ${ err.message } `);
// 	};

// 	navigator.geolocation.getCurrentPosition(success, error, options);
// };

// // Getting API call

// const fetchDataSuccess = ({
// 	main: {
// 		temp,
// 		feels_like,
// 	},
// }) => {
// 	state = {
// 		...state,
// 		temp,
// 		feelsLike: feels_like,
// 	};
// 	console.log('stat = ' + state.name)
// };
// const fetchData = async (city = "London") => {
// 	try {
// 		const query = localStorage.getItem('city') || city;
// 		const response = await fetch(`${ link }& q=${ query }& appid=${ apiKey } `);
// 		const data = await response.json();

// 		if (response.ok) {
// 			console.log(data);
// 		};
// 	} catch (err) {
// 		console.log(err);
// 	};

// let lat = localStorage.getItem('lat');
// let lon = localStorage.getItem('lon');
// let apiKey = '9c485f79c586d7a9e9c5664db72a0320';
// let server;
// let city;
// localStorage.setItem('city', city);
// if ((localStorage.getItem('lat') == null) && (localStorage.getItem('lon') == null) || (localStorage.getItem('city') == undefined)) {
// 	server = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
// } else if (localStorage.getItem('city') !== undefined) {
// 	server = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
// };


// const response = await fetch(server, {
// 	method: 'GET',
// });
// const responseResult = await response.json();

// if (response.ok) {
// 	getWeather(responseResult);
// } else {
// 	console.log(responseResult.message);
// };

// };

//

// function getWeather(data) {

// 	let city = data.name;
// 	let country = data.sys.country;
// 	let location = `${city}, ${country}`;
// 	let temp = Math.round(data.main.temp);
// 	let feelsLikeTemp = Math.round(data.main.feels_like);
// 	let weatherStatus = data.weather[0].main;
// 	let weatherIconId = data.weather[0].icon;
// 	let sunrise = data.sys.sunrise;
// 	let sunset = data.sys.sunset;
// 	let sunriseDate = new Date(sunrise * 1000);
// 	let sunsetDate = new Date(sunset * 1000);

// 	const duration = timeInterval(sunsetDate.getHours(), sunsetDate.getMinutes(), sunsetDate.getSeconds(), sunriseDate.getHours(), sunriseDate.getMinutes(), sunriseDate.getSeconds());



// 	currentCity.innerHTML = location;
// 	currentWeatherStatus.innerHTML = weatherStatus;
// 	currentWeatherIcon.innerHTML = `<img src=./img/icons/${weatherIconId}@2x.png alt="${weatherStatus}" id="currentWeatherImg">`;
// 	currentTemp.innerHTML = `${temp} °C`;
// 	currentFeelsLikeTemp.innerHTML = `Real feel: ${feelsLikeTemp} °C`;
// 	currentDate.innerHTML = nowDate;
// 	currentWeatherSunrise.innerHTML = timeFormater(sunrise);
// 	currentWeatherSunset.innerHTML = timeFormater(sunset);

// 	currentWeatherDuration.textContent = duration;




// };

// const eventForInput = (e) => {
// 	let city = localStorage.setItem('city', e.target.value);

// 	console.log(city)
// };

// const formSubmit = (e) => {
// 	e.preventDefault();
// 	loadWeather();
// }

// textInput.addEventListener('input', eventForInput);
// form.addEventListener('submit', formSubmit)


// getGeolocation();
// fetchData();
