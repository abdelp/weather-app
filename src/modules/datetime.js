const getCurrentDateTime = () => {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const [{value: month,}, , {value: day,}, , {value: year,}, , {value: hour,}
    , , {value: minute,}, , {value: second,}] = dateTimeFormat.formatToParts(date);
  const currentDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  return currentDate;
};

export default getCurrentDateTime;