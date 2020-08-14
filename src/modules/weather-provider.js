import fetchUrl from './fetcher.js';
import to from 'await-to-js';
import {weatherConf} from './params-provider';
import getCurrentDateTime from './datetime';

let data = {
  cityName: '',
  main: '',
  description: '',
  units: 'metric',
  temp: 0,
  min: 0,
  max: 0,
  pressure: 0,
  humidity: 0,
  wind: 0,
  icon: '',
  lastUpdate: ''};

const formatWeatherData = (data) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  return {
    cityName: data.name,
    main: `weather ${data.weather[0].main} landscape`,
    description: data.weather[0].description,
    temp: parseInt(data.main.temp),
    temp_min: parseInt(data.main.temp_min),
    temp_max: parseInt(data.main.temp_max),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: iconUrl,
    units: data.units,
    lastUpdate: data.lastUpdate
  }
};

const updateData = async (cityName, units) => {
  const {api, url} = weatherConf();
  const parametrizedUrl = `${url}?q=${cityName}&appid=${api}&units=${units}`;
  let error, result;

  [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  result.units = units;
  result.lastUpdate = getCurrentDateTime();

  data = formatWeatherData(result);

  return data;
};

const updateDataByCoordinates = async (position, units) => {
  const {api, url} = weatherConf();
  const parametrizedUrl = `${url}?lat=${position.lat}&lon=${position.lon}&appid=${api}&units=${units}`;
  let error, result;

  [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  result.units = units;
  result.lastUpdate = getCurrentDateTime();

  data = formatWeatherData(result);

  return data;
}

const getData = () => {
  return data;
};

const updateUnit = (newUnit) => {
  const {units, temp, temp_min, temp_max} = getData();

  if(newUnit === 'metric' && units != 'metric') {
    data.temp =  (temp - 32) / 1.8;
    data.temp_min = (temp_min - 32) / 1.8;
    data.temp_max = (temp_max - 32) / 1.8;
  } else if(newUnit === 'imperial' && units != 'imperial') {
    data.temp = temp * 1.8 + 32;
    data.temp_min = temp_min * 1.8 + 32;
    data.temp_max = temp_max * 1.8 + 32;
  }
  data.units = newUnit;
};

export {
  updateData,
  updateDataByCoordinates,
  getData,
  updateUnit
};