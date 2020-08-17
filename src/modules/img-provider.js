import to from 'await-to-js';
import fetchUrl from './fetcher.js';
import { imgConf } from './params-provider.js';

const getImgUrl = async (word) => {
  const { api, url } = imgConf();
  const parametrizedUrl = `${url}?api_key=${api}&s=${word}&weirdness=0`;
  let error; let
    result;

  [error, result] = await to(fetchUrl(parametrizedUrl));
  if (error) return error;

  return result.data.images.original.url;
};

export { getImgUrl };