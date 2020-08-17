import to from 'await-to-js';
import fetchUrl from './fetcher';
import { weatherConf } from './params-provider';
import getCurrentDateTime from './datetime';

let data = {
  cityName: '',
  country: '',
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
  lastUpdate: '',
};

const formatWeatherData = (data) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return {
    cityName: data.name,
    main: `landscape ${data.weather[0].description}`,
    description: data.weather[0].description,
    temp: parseInt(data.main.temp, 10),
    tempMin: parseInt(data.main.temp_min, 10),
    tempMax: parseInt(data.main.temp_max, 10),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: iconUrl,
    units: data.units,
    country: data.sys.country,
    lastUpdate: data.lastUpdate,
  };
};

const updateData = async (cityName, units) => {
  const { api, url } = weatherConf();
  const parametrizedUrl = `${url}?q=${cityName}&appid=${api}&units=${units}`;

  const [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  result.units = units;
  result.lastUpdate = getCurrentDateTime();

  data = formatWeatherData(result);

  return data;
};

const updateDataByCoordinates = async (position, units) => {
  const { api, url } = weatherConf();
  const parametrizedUrl = `${url}?lat=${position.lat}&lon=${position.lon}&appid=${api}&units=${units}`;

  const [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  result.units = units;
  result.lastUpdate = getCurrentDateTime();

  data = formatWeatherData(result);

  return data;
};

const getData = () => data;

const updateUnit = (newUnit) => {
  const {
    units, temp, tempMin, tempMax,
  } = getData();

  if (newUnit === 'metric' && units !== 'metric') {
    data.temp = (temp - 32) / 1.8;
    data.tempMin = (tempMin - 32) / 1.8;
    data.tempMax = (tempMax - 32) / 1.8;
  } else if (newUnit === 'imperial' && units !== 'imperial') {
    data.temp = temp * 1.8 + 32;
    data.tempMin = tempMin * 1.8 + 32;
    data.tempMax = tempMax * 1.8 + 32;
  }
  data.units = newUnit;
};

export {
  updateData,
  updateDataByCoordinates,
  getData,
  updateUnit,
};