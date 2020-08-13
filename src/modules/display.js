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

const updateView = (data, backgroundImg) => {
  const {
    temp,
    temp_min,
    temp_max,
    icon,
    description,
    cityName,
    lastUpdate
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
};

export {
  getVal,
  updateView
};