import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem } from "./types";


const getCalendarService = (client: IDeskproClient, calendarId: CalendarItem["id"]) => {
  return baseRequest<CalendarItem>(client, {
    url: `/calendars/${calendarId}`,
  });
};

export { getCalendarService };
