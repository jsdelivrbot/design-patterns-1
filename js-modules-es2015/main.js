/* Notes
- this is synchronous method (similar to CommonJS)
- synchronous is generally more common in server-side
- on client side, can use async to speed up loading
- can use system. class for async
*/ 


import Location from './location'

let printToDOM = response => {
  document.getElementById('content').innerHTML += `${response}<br/>`;
};

let sanFrancisco = new Location('San Francisco', 'US', false);
sanFrancisco.getMyCurrentWeather(printToDOM);

let paris = new Location('Paris', 'FR', true);
paris.getMyCurrentWeather(printToDOM);
