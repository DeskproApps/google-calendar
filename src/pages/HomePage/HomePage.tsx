import { useState, useCallback } from "react";
import get from "lodash/get";
import noop from "lodash/noop";
import endOfWeek from "date-fns/fp/endOfWeekWithOptions";
import addWeeks from "date-fns/addWeeks";
import {
  useDeskproElements,
  useDeskproAppClient,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useCalendars } from "./hooks";
import {
  getSelectedCalendarsService,
  saveSelectedCalendarsService,
} from "../../services/deskpro";
import { getFilteredEvents } from "../../utils";
import { Home } from "../../components";
import type { FC } from "react";
import type { DateTime } from "../../types";
import type { CalendarItem } from "../../services/google/types";

const HomePage: FC = () => {
  const { client } = useDeskproAppClient();
  const [selectedCalendarIds, setSelectedCalendarIds] = useState<Array<CalendarItem["id"]>>([]);
  const [timeMax, setTimeMax] = useState<DateTime>(endOfWeek({ weekStartsOn: 1 }, new Date()).toISOString());
  const { calendars, isLoading, events } = useCalendars(timeMax);

  const onSelectedCalendar = useCallback((selectCalendarId: CalendarItem["id"]) => {
    if (selectCalendarId) {
      const newValue = selectedCalendarIds.includes(selectCalendarId)
        ? selectedCalendarIds.filter((calendarId) => calendarId !== selectCalendarId)
        : [...selectedCalendarIds, selectCalendarId];

      setSelectedCalendarIds(newValue);
      client && saveSelectedCalendarsService(client, newValue).then(noop).catch(noop);
    }
  }, [client, selectedCalendarIds]);

  const onLoadNextWeek = useCallback(() => {
    setTimeMax(endOfWeek({ weekStartsOn: 1 }, addWeeks(new Date(timeMax), 1)).toISOString());
  }, [timeMax]);

  useSetTitle("Google Calendar");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" } },
      ],
    });
  });

  useInitialisedDeskproAppClient((client) => {
    getSelectedCalendarsService(client)
      .then((data) => {
        setSelectedCalendarIds(get(data, [0, "data"], []) as Array<CalendarItem["id"]>);
      })
      .catch(noop);
  });

  return (
    <Home
      events={getFilteredEvents(selectedCalendarIds, events)}
      calendars={calendars}
      isLoading={isLoading}
      selectedCalendars={selectedCalendarIds}
      onSelectedCalendar={onSelectedCalendar}
      onLoadNextWeek={onLoadNextWeek}
    />
  );
};

export { HomePage };
