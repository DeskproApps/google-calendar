import isEmpty from "lodash/isEmpty";
import startOfDay from "date-fns/startOfDay";
import type { EventType, DateTime } from "../types";

const getFilteredDaysFromEvents = (events?: EventType[]): DateTime[] => {
  const daysList: DateTime[] = [];

  if (!Array.isArray(events) || isEmpty(events)) {
    return daysList;
  }

  events.forEach((event) => {
    const { start: { dateTime }} = event;
    const startDate = startOfDay(new Date(dateTime)).toISOString();

    if (!daysList.includes(startDate)) {
      daysList.push(startDate);
    }
  });

  daysList.sort();

  return daysList;
};

export { getFilteredDaysFromEvents };
