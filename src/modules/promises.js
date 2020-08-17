const timeoutPromise = (delay) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error('Timeout!'));
  }, delay);
});

export default timeoutPromise;