let cet = document.querySelector('.cet .the-time');
let edt = document.querySelector('.edt .the-time');

const apiKey = '4c5fdf5194263e3c8f02c66cd1ffe3fb';

const getWeatherData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
};

const animate = async () => {
  const cetWeatherData = await getWeatherData('Sant Cugat del Vallès');
  const edtWeatherData = await getWeatherData('Albany');

  render(cet, 'Europe/Paris', cetWeatherData);
  render(edt, 'America/New_York', edtWeatherData);
};

const render = (el, tmzn, weatherData) => {
  const time = moment.tz(tmzn).format('HH:mm:ss');
  

  el.innerHTML = `${time}`;
  
  // Create a new div for weather info
  const weatherInfoDiv = document.createElement('div');
  weatherInfoDiv.innerHTML = `<img class="weather-icon" src="http://openweathermap.org/img/w/${icon}.png" alt="weather icon"> ${temperature}°C`;
  
  // Replace existing weather info or append new one
  if (el.nextElementSibling) {
    el.nextElementSibling.replaceWith(weatherInfoDiv);
  } else {
    el.parentElement.appendChild(weatherInfoDiv);
  }
};

setInterval(animate, 1000);
animate();
