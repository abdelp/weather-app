const getVal = (inputId) => {
  const input = document.getElementById(inputId);
  return input.value;
};

const updateTemp = (temp) => {
  const tempEl = document.getElementById("main-temp");
  tempEl.innerText = `${temp}°`;
};

const updateMinMax = (temp) => {
  const minMax = document.getElementById("min-max");
  minMax.innerText = `${temp.temp_min}°/${temp.temp_max}°`;
};

const updateDesc = (desc) => {
  const descEl = document.getElementById("desc");
  descEl.innerText = desc;
};

const updateCity = (name) => {
  const cityEl = document.getElementById("city-name");
  cityEl.innerText = name;
};

const updateBackground = (imgUrl) => {
  const backgroundEl = document.getElementById('background');
  backgroundEl.style.background = `url(${imgUrl}) left top / cover no-repeat`;
  console.log(backgroundEl);
};

const cleanForm = (formId) => {
  const formEl = document.getElementById(formId);
  formEl.reset();
};

const updateIcon = (iconUrl) => {
  let iconEl = document.getElementById('weather-icon');
  iconEl.src = iconUrl;
};

const updateLastUpdate = (date) => {
  let lastUpdEl = document.querySelector('#last-update span');
  lastUpdEl.innerText = date;
};

const updateRadialProgressBar = (percentage) => {
  const value = percentage * 250 / 100;
  let progressBar = document.querySelector('#progress-bar path');
  progressBar.setAttribute('stroke-dasharray', `${value},250.2`);
  let percentageText = document.querySelector('#progress-bar text');
  console.log(percentageText);
  console.log(percentage);
  percentageText.textContent = `${percentage}%`;
  console.log(percentageText.innerText);
};

const updatePressure = (pressure) => {
  let pressureEl = document.querySelector('#pressure span');
  pressureEl.innerText = pressure;
};

const updateWind = (wind) => {
  let windEl = document.querySelector('#wind span');
  windEl.innerText = wind;
};

const updateView = (data, backgroundImg) => {
  const {
    temp,
    temp_min,
    temp_max,
    icon,
    description,
    cityName,
    humidity,
    lastUpdate,
    pressure,
    wind
  } = data;
  updateTemp(temp);
  updateMinMax({
    temp_min,
    temp_max
  });
  updateIcon(icon);
  updateDesc(description);
  updateCity(cityName);
  updateLastUpdate(lastUpdate);
  updateBackground(backgroundImg);
  updateRadialProgressBar(humidity);
  updatePressure(pressure);
  updateWind(wind);
};

export {
  getVal,
  updateView
};