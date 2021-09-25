const cityForm = document.querySelector('form');
const cardHTML = document.querySelector('.card');
const detailsHTML = document.querySelector('.details');
const time = document.querySelector('img.daytime');
const icon = document.querySelector('.icon img'); 
const forecast = new Forecast();

// Updating the HTML with the city information
const updatingHTML = (data) => {
  
  const { details, weather } = data;
  
  if(cardHTML.classList.contains('d-none')) cardHTML.classList.remove('d-none')

  // Updating the innerHTML
  detailsHTML.innerHTML = `
    <h5 class="my-3">${details.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

  // Updating the day time img
  let timeImg = weather.IsDayTime ? 'assets/day.svg' : 'assets/night.svg';
  time.setAttribute('src', timeImg);

  // Updating the icon img
  let iconImg = `assets/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconImg)


};

// Getting the city name from the form
cityForm.addEventListener('submit', (e) => {
  
  // Getting the name info
  e.preventDefault();
  let cityName = cityForm.city.value.trim().toLowerCase();
  localStorage.setItem('city', cityName);
  cityForm.reset();

  // Updating the city
  forecast.updatingCity(cityName)
    .then(data => updatingHTML(data))
    .catch(err => console.log(err))

});

// Checking Local Storage to display the info
if(localStorage.getItem('city')) {
  forecast.updatingCity(localStorage.getItem('city'))
    .then(data => updatingHTML(data))
    .catch(err => console.log(err))
}