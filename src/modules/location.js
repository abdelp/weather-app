import PubSub from 'pubsub-js';

const notifyLocation = (position) => {
  PubSub.publish('location retrieved', position);
};

const getLocation = () => {
  let result;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(notifyLocation);
  } else {
    result = Error('Geolocation is not supported by this browser.');
  }

  return result;
};

export default getLocation;