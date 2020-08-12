import fetchUrl from './modules/fetcher.js';
import timeoutPromise from './modules/promises.js';
import to from 'await-to-js';
import * as Display from './modules/display.js';

window.searchForecast = async () => {
  const api = 'YOUR_API_KEY';
  const cityName = 'Asuncion';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`;

  let error, result;

  [error, result] = await to(Promise.race([
      fetchUrl(url),
      timeoutPromise(3000)
    ]));
  console.log(result.main);

  Display.updateTemp(result.main.temp);
  Display.updateMinMax({temp_min: result.main.temp_min, temp_max: result.main.temp_max});
  Display.updateDesc(result.weather[0].description);

  return result;
};