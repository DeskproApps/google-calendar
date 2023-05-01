import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { Container } from "../common";
import { CalendarsSelect } from "./CalendarsSelect";
import { Events } from "./Events";
import type { FC } from "react";
import type { CalendarItem } from "../../services/google/types";
import type { EventType } from "../../types";

type Props = {
  isLoading: boolean,
  events: EventType[],
  calendars: CalendarItem[],
  selectedCalendars: Array<CalendarItem["id"]>,
  onSelectedCalendar: (calendarId: CalendarItem["id"]) => void,
};

const Home: FC<Props> = ({
  events,
  calendars,
  isLoading,
  selectedCalendars,
  onSelectedCalendar,
}) => {
  return (
    <>
      <Container>
        <CalendarsSelect
          calendars={calendars}
          selectedCalendars={selectedCalendars}
          onSelectedCalendar={onSelectedCalendar}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        {isLoading
          ? <LoadingSpinner/>
          : <Events events={events} />
        }
      </Container>
    </>
  );
};

export { Home };
