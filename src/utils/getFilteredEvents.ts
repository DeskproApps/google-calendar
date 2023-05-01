import size from "lodash/size";
import type { EventType } from "../types";

const getFilteredEvents = (
  selectedCalendarIds: Array<EventType["calendarId"]>,
  events: EventType[],
): EventType[] => {
  if (!Array.isArray(selectedCalendarIds) || !size(selectedCalendarIds)) {
    return [];
  }

  if (!Array.isArray(events) || !size(events)) {
    return [];
  }

  return events.filter(({ calendarId }) => selectedCalendarIds.includes(calendarId));
};

export { getFilteredEvents };
