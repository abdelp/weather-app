import PubSub from 'pubsub-js';

const getLocation = () => {
  let result;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(notifyLocation);
  } else {
    result = Error('Geolocation is not supported by this browser.');
  }

  return result;
};

const notifyLocation = (position) => {
  PubSub.publish('location retrieved', position);
};

export { getLocation };