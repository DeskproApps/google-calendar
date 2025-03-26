import { getFilteredDaysFromEvents } from "./getFilteredDaysFromEvents";
import startOfDay from "date-fns/startOfDay";
import type { EventType, DateTime } from "../types";

const getMapFilteredEventsByDay = (
  events?: EventType[],
): Record<DateTime, EventType[]> => {

  if (!Array.isArray(events) || events.length <= 0) {
    return {};
  }
  const daysList = getFilteredDaysFromEvents(events);

  return daysList.reduce<Record<DateTime, EventType[]>>((acc, day) => {

    acc[day] = events.filter((event) => {

      const dateTime = event.start.dateTime ?? event.start.date

      return startOfDay(new Date(dateTime)).toISOString() === day
    });
    // sort by date
    acc[day].sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime());
    return acc;
  }, {});
};

export { getMapFilteredEventsByDay };
