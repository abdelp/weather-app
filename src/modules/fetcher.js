import timeoutPromise from './promises.js';
import to from 'await-to-js';

const fetchUrl = async (url) => {
  let error, result;

  [error, result] = await to(Promise.race([
    fetch(url, {
      mode: 'cors'
    }),
    timeoutPromise(3000)
  ]));

  if (error) return error;

  return result.json();
};

export default fetchUrl;