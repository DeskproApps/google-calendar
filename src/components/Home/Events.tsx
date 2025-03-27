import { Container } from "../common";
import { DAY_FORMAT } from "../../constants";
import { Event } from "./Event";
import { format } from "../../utils/date";
import { getMapFilteredEventsByDay } from "../../utils";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { LoadNextWeek } from "./LoadNextWeek";
import { P3, H1 } from "@deskpro/deskpro-ui";
import { useMemo, Fragment } from "react";
import type { EventType } from "../../types";
import type { FC } from "react";

type Props = {
  events: EventType[],
  onLoadNextWeek: () => void,
  onNavigateToEvent: (calendarId: EventType["calendarId"], eventId: EventType["id"]) => void,
};

const Events: FC<Props> = ({ events, onLoadNextWeek, onNavigateToEvent }) => {
  const mapFilteredEvents = useMemo(() => getMapFilteredEventsByDay(events), [events]);

  return (events.length === 0)
    ? (
      <Container>
        <P3>No events found in calendar(s)</P3>
      </Container>
    )
    : (
      <>
        {/* Render the events grouped by days */}
        {Object.entries(mapFilteredEvents).map(([day, value]) => (
          <Fragment key={day}>
            <Container>
              <H1 style={{ marginBottom: 14 }}>{format(day, DAY_FORMAT)}</H1>
              {value.map((event) => (
                <Event key={event.id} {...event} onNavigateToEvent={onNavigateToEvent} />
              ))}
            </Container>
            <HorizontalDivider style={{ marginBottom: 10 }} />
          </Fragment>
        ))}

        <LoadNextWeek onLoadNextWeek={onLoadNextWeek} />
      </>
    )
};

export { Events };
