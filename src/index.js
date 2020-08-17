import to from 'await-to-js';
import PubSub from 'pubsub-js';
import * as Display from './modules/display';
import './assets/stylesheets/style.css';
import * as Weather from './modules/weather-provider';
import getImgUrl from './modules/img-provider';
import getLocation from './modules/location';
import './assets/stylesheets/toggle-switch.css';

window.searchForecast = async () => {
  const cityName = Display.getVal('city');
  const units = Display.getUnits();

  let error;
  let weatherData = {};

  [error, weatherData] = await to(Weather.updateData(cityName, units));
  if (error) {
    Display.showModal('not-found-modal');
  } else {
    let imgUrl;
    [error, imgUrl] = await to(getImgUrl(weatherData.main));

    Display.updateView(weatherData, imgUrl);
    Display.cleanForm('search-form');
  }
};

const searchByCoordinates = async (event, position) => {
  const units = Display.getUnits();
  let error;
  let
    weatherData = {};

  if (error) {
    Display.showModal('not-found-modal');
  } else {
    [error, weatherData] = await to(Weather.updateDataByCoordinates({
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    }, units));

    let imgUrl;
    [error, imgUrl] = await to(getImgUrl(weatherData.main));

    Display.updateView(weatherData, imgUrl);
  }
};

const updateView = async (event, unit) => {
  Weather.updateUnit(unit);

  const {
    temp,
    tempMin,
    tempMax,
  } = Weather.getData();

  Display.updateTemp(temp);
  Display.updateMinMax({
    tempMin,
    tempMax,
  });
};

PubSub.subscribe('location retrieved', searchByCoordinates);
PubSub.subscribe('unit changed', updateView);
PubSub.subscribe('enter pressed', window.searchForecast);

getLocation();

window.onload = () => {
  Display.setUnitChangeHandler();
  Display.disableSubmit('search-form');
};