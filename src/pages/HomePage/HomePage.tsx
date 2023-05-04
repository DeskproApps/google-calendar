import { useState, useCallback, useEffect } from "react";
import get from "lodash/get";
import noop from "lodash/noop";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import size from "lodash/size";
import endOfWeek from "date-fns/fp/endOfWeekWithOptions";
import addWeeks from "date-fns/addWeeks";
import { useNavigate, createSearchParams } from "react-router-dom";
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
import type { CalendarItem, EventItem } from "../../services/google/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
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

  const onNavigateToEvent = useCallback((calendarId: CalendarItem["id"], eventId: EventItem["id"]) => {
    navigate({
      pathname: "/event",
      search: `?${createSearchParams([
        ["eventId", eventId],
        ["calendarId", calendarId],
      ])}`,
    });
  }, [navigate]);

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

  useEffect(() => {
    if (!client || isEmpty(calendars) || size(selectedCalendarIds)) {
      return;
    }

    const { id } = find(calendars, ["primary", true]) || {};

    if (id) {
      setSelectedCalendarIds([id]);
      saveSelectedCalendarsService(client, [id]).then(noop).catch(noop);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, calendars]);

  return (
    <Home
      events={getFilteredEvents(selectedCalendarIds, events)}
      calendars={calendars}
      isLoading={isLoading}
      selectedCalendars={selectedCalendarIds}
      onSelectedCalendar={onSelectedCalendar}
      onLoadNextWeek={onLoadNextWeek}
      onNavigateToEvent={onNavigateToEvent}
    />
  );
};

export { HomePage };
