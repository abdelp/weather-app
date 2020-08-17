import PubSub from 'pubsub-js';

const getVal = (inputId) => {
  const input = document.getElementById(inputId);
  return input.value;
};

const getUnits = () => {
  const unitsEl = document.getElementById('units');
  const units = unitsEl.checked ? 'metric' : 'imperial';
  return units;
};

const updateTemp = (temp) => {
  const tempEl = document.getElementById('main-temp');
  temp = parseInt(temp, 10);
  tempEl.innerText = `${temp}°`;
};

const updateMinMax = (temp) => {
  const minMax = document.getElementById('min-max');
  minMax.innerText = `${parseInt(temp.tempMin, 10)}°/${parseInt(temp.tempMax, 10)}°`;
};

const updateDesc = (desc) => {
  const descEl = document.getElementById('desc');
  descEl.innerText = desc;
};

const updateCity = (name, country) => {
  const cityEl = document.getElementById('city-name');
  cityEl.innerText = `${name}, ${country}`;
};

const updateBackground = (imgUrl) => {
  const backgroundEl = document.getElementById('background');
  backgroundEl.style.background = `url(${imgUrl}) left top / cover no-repeat`;
};

const cleanForm = (formId) => {
  const formEl = document.getElementById(formId);
  formEl.reset();
};

const updateIcon = (iconUrl) => {
  const iconEl = document.getElementById('weather-icon');
  iconEl.src = iconUrl;
};

const updateLastUpdate = (date) => {
  const lastUpdEl = document.querySelector('#last-update span');
  lastUpdEl.innerText = date;
};

const updateRadialProgressBar = (percentage) => {
  const value = (percentage * 250) / 100;
  const progressBar = document.querySelector('#progress-bar path');
  progressBar.setAttribute('stroke-dasharray', `${value},250.2`);
  const percentageText = document.querySelector('#progress-bar text');
  percentageText.textContent = `${percentage}%`;
};

const updatePressure = (pressure) => {
  const pressureEl = document.querySelector('#pressure span');
  pressureEl.innerText = pressure;
};

const updateWind = (wind) => {
  const windEl = document.querySelector('#wind span');
  windEl.innerText = wind;
};

const changeUnitDisplay = () => {
  const unitsEl = document.getElementById('units');
  let unit;

  if (unitsEl.checked) {
    unit = 'metric';
  } else {
    unit = 'imperial';
  }

  PubSub.publish('unit changed', unit);
};

const setUnitChangeHandler = () => {
  const unitsEl = document.getElementById('units');
  unitsEl.addEventListener('change', changeUnitDisplay);
};

const updateView = (data, backgroundImg) => {
  const {
    temp,
    tempMin,
    tempMax,
    icon,
    description,
    cityName,
    country,
    humidity,
    lastUpdate,
    pressure,
    wind,
  } = data;
  updateTemp(temp);
  updateMinMax({
    tempMin,
    tempMax,
  });
  updateIcon(icon);
  updateDesc(description);
  updateCity(cityName, country);
  updateLastUpdate(lastUpdate);
  updateBackground(backgroundImg);
  updateRadialProgressBar(humidity);
  updatePressure(pressure);
  updateWind(wind);
};

const disableSubmit = () => {
  const element = document.getElementById('city');
  element.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (element.value) {
        PubSub.publish('enter pressed');
      }
    }
  });
};

const showModal = (modalId) => {
  $(`#${modalId}`).modal('show'); // eslint-disable-line no-undef
};

export {
  getVal,
  updateView,
  getUnits,
  setUnitChangeHandler,
  updateTemp,
  updateMinMax,
  cleanForm,
  disableSubmit,
  showModal,
};