import to from 'await-to-js';
import timeoutPromise from './promises';

const fetchUrl = async (url) => {
  const [error, result] = await to(Promise.race([
    fetch(url, {
      mode: 'cors',
    }),
    timeoutPromise(3000),
  ]));

  if (error) return error;

  return result.json();
};

export default fetchUrl;