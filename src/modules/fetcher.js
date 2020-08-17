import to from 'await-to-js';
import timeoutPromise from './promises.js';

const fetchUrl = async (url) => {
  let error; let
    result;

  [error, result] = await to(Promise.race([
    fetch(url, {
      mode: 'cors',
    }),
    timeoutPromise(3000),
  ]));

  if (error) return error;

  return result.json();
};

export default fetchUrl;