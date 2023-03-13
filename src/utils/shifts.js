const getHourString = (hour) => {
  if (hour === 23)
    return "00";
  
  if (hour < 9)
    return `0${hour + 1}`;
    
  return hour + 1;
};

const getShiftNameByHour = (i) => {
  if (i < 8)
    return "morning";

  if (i < 16)
    return "afternoon";

  return "night";
};

const getTableNumber = (mesaInit) => {
  if ( mesaInit > 0)
    return mesaInit + 1;
    
  return mesaInit;
};

export {
  getHourString,
  getShiftNameByHour,
  getTableNumber
};