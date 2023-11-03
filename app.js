const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': '9534fd6aa1msh9c621141a2838fbp15877bjsnbac4a7b74d5b',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const getWeather = (city) => {
  const cityName = city;
  const URL = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
  const w_Url = URL + cityName;
  fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName, options)
      .then(response => {
        if (!response.ok) {
          alert('Unable to detremine Forecast');
          throw new Error('Invalid city name or API error');
      }
      return response.json();
      })
      .then(response => {
        if (response.error) {
          throw new Error(response.error);
      }
          console.log(response);
          const cloud_pct = document.getElementById('cloud_pct');
          const feels_like = document.getElementById('feels_like');
          const humidity = document.getElementById('humidity');
          const max_temp = document.getElementById('max_temp');
          const min_temp = document.getElementById('min_temp');
          const temp = document.getElementById('temp');
          const wind_degrees = document.getElementById('wind_degrees');
          const wind_speed = document.getElementById('wind_speed');

          cloud_pct.innerHTML = response.cloud_pct;
          feels_like.innerHTML = response.feels_like;
          humidity.innerHTML = response.humidity;
          max_temp.innerHTML = response.max_temp;
          min_temp.innerHTML = response.min_temp;
          temp.innerHTML = response.temp;
          wind_degrees.innerHTML = response.wind_degrees;
          wind_speed.innerHTML = response.wind_speed;

          const sunriseTimestamp = response.sunrise; // Replace with your actual timestamp
          const sunsetTimestamp = response.sunset;
          const formattedSunrise = formatTimestamp(sunriseTimestamp);
          const formattedSunset = formatTimestamp(sunsetTimestamp);
        
          const sunriseElement = document.getElementById('formattedSunrise');
          const sunsetElement = document.getElementById('formattedSunset');
          sunriseElement.textContent = formattedSunrise;
          sunsetElement.textContent = formattedSunset;

          const cityNameElement = document.getElementById('cityName');
          cityNameElement.textContent = cityName.toUpperCase();
      })
      .catch(err => console.error(err));
};

function formatTimestamp(timestamp) {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', options);
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const offset = window.scrollY;

  if (offset > 60) {
      navbar.classList.add("sticky-top");
  } else {
      navbar.classList.remove("sticky-top");
  }
});

const submit = document.getElementById('submit');
const city = document.getElementById('city');

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const cityName = city.value;
  if(cityName === '' || cityName === ' '){
    alert('Please enter a City Name');
  } else{
    getWeather(cityName);
    city.value = '';
  }
});
