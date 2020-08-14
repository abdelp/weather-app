import to from 'await-to-js';
import * as Display from './modules/display.js';
import './assets/stylesheets/style.css';
import * as Weather from './modules/weather-provider.js';
import * as Img from './modules/img-provider.js';
import * as Location from './modules/location.js';
import PubSub from 'pubsub-js';
import getCurrentDateTime from './modules/datetime';
import './assets/stylesheets/toggle-switch.css';

window.searchForecast = async () => {
  const cityName = Display.getVal('city');
  let error, weatherData;

  [error, weatherData] = await to(Weather.getForecast(cityName, 'metric'));

  weatherData.lastUpdate = getCurrentDateTime();

  let imgUrl;
  [error, imgUrl] = await to(Img.getImgUrl(weatherData.description));

  Display.updateView(weatherData, imgUrl);
};

const searchByCoordinates = async (event, position) => {
  let error, weatherData;

  [error, weatherData] = await to(Weather.getForecastByCoordinates({lon: position.coords.longitude, lat: position.coords.latitude}, 'metric'));

  let imgUrl;
  [error, imgUrl] = await to(Img.getImgUrl(weatherData.main));

  weatherData.lastUpdate = getCurrentDateTime();
  Display.updateView(weatherData, imgUrl);
};

PubSub.subscribe('location retrieved', searchByCoordinates);

Location.getLocation();