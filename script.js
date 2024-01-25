
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.weather-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weather = {};

weather.temperature = {
  unit: 'celsius',
};

const KELVIN = 273;

const key = '4c28696eb0b7bd9f5e435c66617428ae';

const displayWeather = () => {
  iconElement.innerHTML = `<img src="../icons/${weather.iconId}.svg"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};

const showError = (error) => {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
};

const getWeather = async (latitude, longitude) => {
  modalTrigger();
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  try {
    const response = await fetch(api);
    const data = await response.json();
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    displayWeather(); 
  } catch (error) {
    console.log(error);
    showError(error);
  }
};


const celsiusToFahrenheit = (temperature) => {
  return (temperature * 9) / 5 + 32;
};

tempElement.addEventListener('click', function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});


const modalTrigger = () => {
  const modal = document.querySelector('.modal');

  modal.classList.add('show-modal');
  setTimeout(() => {
    modal.classList.remove('show-modal');
  }, 2000);
};
