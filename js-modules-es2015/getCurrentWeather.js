// getCurrentWeather.js


let getCurrentWeather = (() => {
  function ajax(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  function generateResponse(city, country, useMetric, printFn, data) {
    var unit = `°${useMetric? 'C': 'F'}`;
    // OpenWeather API response: http://openweathermap.org/current#current_JSON
    printFn(`${city}, ${country}: ${data.weather[0].main}. Now ${data.main.temp}${unit}.`);
  }
  return function(city, country, useMetric, printFn) {
    var unit = useMetric ? 'metric' : 'imperial';
    // OpenWeather API request: http://openweathermap.org/current#one
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${unit}&APPID=c48ddbf104363ec75645b36b470559fc`;
    ajax(url, generateResponse.bind(undefined, city, country, useMetric, printFn));
  }
})();


export default getCurrentWeather;

