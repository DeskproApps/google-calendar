import { APP_PREFIX } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem } from "../google/types";

const saveSelectedCalendarsService = (
  client: IDeskproClient,
  selectedCalendarIds: Array<CalendarItem["id"]>,
) => {
  return client.setUserState(`${APP_PREFIX}/selectedCalendarIds`, selectedCalendarIds);
};

export { saveSelectedCalendarsService };
