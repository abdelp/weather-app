import fetchUrl from './fetcher.js';
import to from 'await-to-js';
import {weatherConf} from './params-provider';

const formatWeatherData = (data) => {
  return {
    cityName: data.name,
    description: data.weather[0].description,
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: data.wind
  }
};

const getForecast = async (cityName, units) => {
  const {api, url} = weatherConf();

  const parametrizedUrl = `${url}?q=${cityName}&appid=${api}&units=${units}`;
  let error, result;

  [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  return formatWeatherData(result);
};

export {
  getForecast
};