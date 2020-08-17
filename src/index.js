import to from 'await-to-js';
import * as Display from './modules/display.js';
import './assets/stylesheets/style.css';
import * as Weather from './modules/weather-provider.js';
import * as Img from './modules/img-provider.js';
import * as Location from './modules/location.js';
import PubSub from 'pubsub-js';
import './assets/stylesheets/toggle-switch.css';

window.searchForecast = async () => {
  const cityName = Display.getVal('city');
  const units = Display.getUnits();

  let error, weatherData;

  [error, weatherData] = await to(Weather.updateData(cityName, units));
  if(weatherData) {

    let imgUrl;
    [error, imgUrl] = await to(Img.getImgUrl(weatherData.main));

    Display.updateView(weatherData, imgUrl);
    Display.cleanForm('search-form');
  } else {
    Display.showModal('not-found-modal');
  }
};

const searchByCoordinates = async (event, position) => {
  const units = Display.getUnits();
  let error, weatherData;
  [error, weatherData] = await to(Weather.updateDataByCoordinates({lon: position.coords.longitude, lat: position.coords.latitude}, 'metric'));

  // if(weatherData)
  let imgUrl;
  [error, imgUrl] = await to(Img.getImgUrl(weatherData.main));

  Display.updateView(weatherData, imgUrl);
};

const updateView = async (event, unit) => {
  Weather.updateUnit(unit);

  const {temp, temp_min, temp_max} = Weather.getData();

  Display.updateTemp(temp);
  Display.updateMinMax({temp_min, temp_max});
};

PubSub.subscribe('location retrieved', searchByCoordinates);
PubSub.subscribe('unit changed', updateView);
PubSub.subscribe('enter pressed', searchForecast);

Location.getLocation();

window.onload = () => {
  Display.setUnitChangeHandler();
  Display.disableSubmit('search-form');
}