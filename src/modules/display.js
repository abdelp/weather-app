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

export {getVal, updateTemp, updateMinMax, updateDesc};