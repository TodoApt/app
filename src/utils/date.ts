import { getDate, getMonth, getYear } from "date-fns";

export const getDateInUTC = (date: Date) => {
  const day = getDate(date);
  const month = getMonth(date);
  const year = getYear(date);
  const utcTS = Date.UTC(year, month, day, 0, 0, 0, 0);
  return new Date(utcTS);
};
