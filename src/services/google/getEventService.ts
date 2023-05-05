import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem, EventItem, Event } from "./types";

const getEventService = (
  client: IDeskproClient,
  calendarId: CalendarItem["id"],
  eventId: EventItem["id"],
) => {
  return baseRequest<Event>(client, {
    url: `/calendars/${calendarId}/events/${eventId}`,
  });
};

export { getEventService };
