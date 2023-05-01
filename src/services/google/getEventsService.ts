import startOfToday from "date-fns/startOfToday";
import endOfWeek from "date-fns/endOfWeek";
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DateTime } from "../../types";
import type { CalendarItem, CalendarEvents } from "./types";

const getEventsService = (
  client: IDeskproClient,
  calendarId: CalendarItem["id"],
  timeMax: DateTime = endOfWeek(new Date).toISOString(),
) => {
  return baseRequest<CalendarEvents>(client, {
    url: `/calendars/${calendarId}/events`,
    queryParams:{
      timeMin: startOfToday().toISOString(),
      timeMax,
      singleEvents: "true",
    },
  })
};

export { getEventsService };
