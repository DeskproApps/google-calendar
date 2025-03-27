import startOfDay from "date-fns/startOfDay";
import type { EventType, DateTime } from "../types";

const getFilteredDaysFromEvents = (events?: EventType[]): DateTime[] => {
  const daysList: DateTime[] = [];

  if (!Array.isArray(events) || events.length <= 0) {
    return daysList;
  }

  events.forEach((event) => {
    const { start } = event;

    const dateTime = start.dateTime ?? start.date

    if (!dateTime) {
      return;
    }
    const startDate = startOfDay(new Date(dateTime)).toISOString();

    if (!daysList.includes(startDate)) {
      daysList.push(startDate);
    }
  });

  daysList.sort();

  return daysList;
};

export { getFilteredDaysFromEvents };
