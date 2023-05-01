import { useState, useCallback } from "react";
import { useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useCalendars } from "./hooks";
import { getFilteredEvents } from "../../utils";
import { Home } from "../../components";
import type { FC } from "react";
import type { CalendarItem } from "../../services/google/types";

const HomePage: FC = () => {
  const [selectedCalendarIds, setSelectedCalendarIds] = useState<Array<CalendarItem["id"]>>([]);
  const { calendars, isLoading, events } = useCalendars();

  const onSelectedCalendar = useCallback((selectCalendarId: CalendarItem["id"]) => {
    if (selectCalendarId) {
      const newValue = selectedCalendarIds.includes(selectCalendarId)
        ? selectedCalendarIds.filter((calendarId) => calendarId !== selectCalendarId)
        : [...selectedCalendarIds, selectCalendarId];

      setSelectedCalendarIds(newValue);
    }
  }, [selectedCalendarIds]);

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

  return (
    <Home
      events={getFilteredEvents(selectedCalendarIds, events)}
      calendars={calendars}
      isLoading={isLoading}
      selectedCalendars={selectedCalendarIds}
      onSelectedCalendar={onSelectedCalendar}
    />
  );
};

export { HomePage };
