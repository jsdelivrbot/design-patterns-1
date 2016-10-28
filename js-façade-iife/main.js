// Challenge exercise from Design Patterns for JS talk
// Slides @ http://tiagorg.com/talk-design-patterns-for-javascript-featuring-modules/

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
    ajax(url, generateResponse.bind(undefined, city, country, useMetric, printFn)); // bind
  }
})();

let printToDOM = response => {
  document.getElementById('content').innerHTML += `${response}<br/>`;
};

// One method of invocation:

//getCurrentWeather('San Francisco', 'US', false, printToDOM);
//getCurrentWeather('Paris', 'FR', true, printToDOM);


/* Notes on ES2015
  - ES2015 works for Chrome/Firefox, but not Safari
  - Use Babel (https://babeljs.io/) to translate, though note that it requires setup
  - Constructor reference: http://plnkr.co/edit/ARySm1?p=preview
*/

/* Challenge Task: 
  - Write a class Location whose constructor receives 3 attributes: city, country and useMetric.
  - Under Location, write a method getMyCurrentWeather(printFn), which will call getCurrentWeather behind the scenes.
*/

// non-class method:
/*
function Location(city, country, useMetric) {
  this.city = city;
  this.country = country;
  this.useMetric = useMetric;

  // putting it outside is better for memory
  this.getMyCurrentWeather = function(callback) {
    return getCurrentWeather(city, country, useMetric, callback);
  };
}
*/

// ES2015

class Location {
  constructor(city, country, useMetric) {
    this.city = city;
    this.country = country;
    this.useMetric = useMetric;
  }
  
  getMyCurrentWeather(printFn) {
    return getCurrentWeather(this.city, this.country, this.useMetric, printFn);
  }
}

var sf = new Location('San Francisco', 'US', false);
var paris = new Location('Paris', 'FR', true);

sf.getMyCurrentWeather(printToDOM);
paris.getMyCurrentWeather(printToDOM);

