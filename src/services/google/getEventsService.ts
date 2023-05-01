import startOfToday from "date-fns/startOfToday";
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem, CalendarEvents } from "./types";

const getEventsService = (client: IDeskproClient, calendarId: CalendarItem["id"]) => {
  return baseRequest<CalendarEvents>(client, {
    url: `/calendars/${calendarId}/events`,
    queryParams:{
      timeMin: startOfToday().toISOString(),
    },
  })
};

export { getEventsService };
