const fetchUrl = async (url) => {
  let response;

  try {
    response = await fetch(url, {mode: 'cors'});
  } catch(error) {
    response = await error;
  }

  return response.json();
};

export default fetchUrl;