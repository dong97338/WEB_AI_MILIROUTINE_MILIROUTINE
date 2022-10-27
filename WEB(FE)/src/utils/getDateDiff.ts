export const getDateDiff = (date1: Date, date2: Date) => {
  const elapsedMSec: number = date2.getTime() - date1.getTime();
  const elapsedDay: number = elapsedMSec / 1000 / 60 / 60 / 24;
  return elapsedDay.toFixed();
};
