import to from 'await-to-js';
import * as Display from './modules/display.js';
import './assets/stylesheets/style.css';
import * as Weather from './modules/weather-provider.js';
import * as Img from './modules/img-provider.js';

window.searchForecast = async () => {
  const cityName = Display.getVal('city');
  let error, weatherData;

  [error, weatherData] = await to(Weather.getForecast(cityName, 'metric'));

  let imgUrl;
  [error, imgUrl] = await to(Img.getImgUrl(weatherData.description));

  Display.updateView(weatherData, imgUrl);
};