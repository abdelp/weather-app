const timeoutPromise = (delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject("Timeout!");
		}, delay);
	});
};

export default timeoutPromise;