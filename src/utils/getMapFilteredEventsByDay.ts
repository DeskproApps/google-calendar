import isEmpty from "lodash/isEmpty";
import startOfDay from "date-fns/startOfDay";
import { getFilteredDaysFromEvents } from "./getFilteredDaysFromEvents";
import type { EventType, DateTime } from "../types";

const getMapFilteredEventsByDay = (
  events?: EventType[],
): Record<DateTime, EventType[]> => {
  if (!Array.isArray(events) || isEmpty(events)) {
    return {};
  }

  const daysList = getFilteredDaysFromEvents(events);

  return daysList.reduce<Record<DateTime, EventType[]>>((acc, day) => {
    acc[day] = events.filter((event) => startOfDay(new Date(event.start.dateTime)).toISOString() === day);
    // sort by date
    acc[day].sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime());
    return acc;
  }, {});
};

export { getMapFilteredEventsByDay };
