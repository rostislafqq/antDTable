export const sortDate = (dateStr1, dateStr2) => {
  const [day1, month1, year1] = dateStr1.split('.');
  const [day2, month2, year2] = dateStr2.split('.');

  if (year1 !== year2) {
    return year1 - year2;
  }

  if (month1 !== month2) {
    return month1 - month2;
  }

  return day1 - day2;
};
