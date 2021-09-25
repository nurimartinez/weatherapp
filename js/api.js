class Forecast {

  constructor() {
    this.key = '0jmQ4EMJGHsk2YIf82kbpQzVRoIqCm0t';
    this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
  }

  async updatingCity(city) {
    const cityDetails = await this.getCity(city);
    const cityWeather = await this.getWeather(cityDetails);
    return {
      details: cityDetails,
      weather: cityWeather
    } 
  };

  async getCity(city) {
    const queries = `?apikey=${this.key}&q=${city}`;
    let response = await fetch(this.cityURI + queries);
    let data = await response.json();
    return data[0];
  };

  async getWeather(id) {
    console.log(id)
    const query = `${id.Key}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  };

} 
