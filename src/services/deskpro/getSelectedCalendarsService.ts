import { APP_PREFIX } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem } from "../google/types";

const getSelectedCalendarsService = (client: IDeskproClient) => {
  return client.getUserState<Array<CalendarItem["id"]>>(`${APP_PREFIX}/selectedCalendarIds`);
};

export { getSelectedCalendarsService };
