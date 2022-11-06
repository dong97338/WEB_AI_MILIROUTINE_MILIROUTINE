export const getDateDiff = (date1: Date, date2: Date) => {
  const elapsedMSec: number = date2.getTime() - date1.getTime();
  const elapsedDay: number = elapsedMSec / 1000 / 60 / 60 / 24;
  return Number(elapsedDay.toFixed());
};

export const getDateStr = (date: Date) => {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
