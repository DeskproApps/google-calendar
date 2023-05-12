import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { CalendarsSelect } from "./CalendarsSelect";
import { Events } from "./Events";
import { CreateNewEventButton } from "./CreateNewEventButton";
import type { FC } from "react";
import type { CalendarItem, EventItem } from "../../services/google/types";
import type { EventType } from "../../types";

type Props = {
  isLoading: boolean,
  events: EventType[],
  calendars: CalendarItem[],
  selectedCalendars: Array<CalendarItem["id"]>,
  onSelectedCalendar: (calendarId: CalendarItem["id"]) => void,
  onLoadNextWeek: () => void,
  onNavigateToEvent: (calendarId: CalendarItem["id"], eventId: EventItem["id"]) => void,
  onNavigateToCreateEvent: () => void,
};

const Home: FC<Props> = ({
  events,
  calendars,
  isLoading,
  selectedCalendars,
  onSelectedCalendar,
  onLoadNextWeek,
  onNavigateToEvent,
  onNavigateToCreateEvent,
}) => {
  return (
    <>
      <CreateNewEventButton onNavigateToCreateEvent={onNavigateToCreateEvent} />
      <CalendarsSelect
        calendars={calendars}
        selectedCalendars={selectedCalendars}
        onSelectedCalendar={onSelectedCalendar}
      />
      <HorizontalDivider/>
      {isLoading
        ? <LoadingSpinner/>
        : <Events events={events} onLoadNextWeek={onLoadNextWeek} onNavigateToEvent={onNavigateToEvent} />
      }
    </>
  );
};

export { Home };
