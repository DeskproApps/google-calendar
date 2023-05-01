import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarList } from "./types";

const getCalendarsService = (client: IDeskproClient) => {
  return baseRequest<CalendarList>(client, {
    url: "/users/me/calendarList",
  })
};

export { getCalendarsService };
