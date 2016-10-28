// location.js

import getCurrentWeather from './getCurrentWeather';

class Location {
  constructor(city, country, useMetric) {
    this.city = city;
    this.country = country;
    this.useMetric = useMetric;
  }
  
  getMyCurrentWeather(printFn) {
    getCurrentWeather(this.city, this.country, this.useMetric, printFn);
  }
}

export default Location;
