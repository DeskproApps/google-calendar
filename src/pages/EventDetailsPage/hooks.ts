import get from "lodash/get";
import { useQueryWithClient } from "../../hooks";
import { getEventService, getCalendarService } from "../../services/google";
import { QueryKey } from "../../query";
import type { CalendarItem, Event } from "../../services/google/types";

type UseEvent = (calendarId: CalendarItem["id"], eventId: Event["id"]) => {
  isLoading: boolean,
  calendar: CalendarItem,
  event: Event,
};

const useEvent: UseEvent = (calendarId, eventId) => {
  const calendar = useQueryWithClient(
    [QueryKey.CALENDARS, calendarId],
    (client) => getCalendarService(client, calendarId),
    { enabled: !!calendarId },
  );

  const event = useQueryWithClient(
    [QueryKey.CALENDARS, calendarId, QueryKey.EVENT, eventId],
    (client) => getEventService(client, calendarId, eventId),
    { enabled: !!calendarId && !!eventId },
  );

  return {
    isLoading: [event, calendar].every(({ isLoading }) => isLoading),
    calendar: get(calendar, ["data"], []) as CalendarItem,
    event: get(event, ["data"], []) as Event,
  };
};

export { useEvent };
