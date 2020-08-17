const timeoutPromise = (delay) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Timeout!');
  }, delay);
});

export default timeoutPromise;