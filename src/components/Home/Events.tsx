import { useMemo, Fragment } from "react";
import size from "lodash/size";
import map from "lodash/map";
import { P3, H1 } from "@deskpro/deskpro-ui";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { getMapFilteredEventsByDay } from "../../utils";
import { DAY_FORMAT } from "../../constants";
import { format } from "../../utils/date";
import { Container } from "../common";
import { Event } from "./Event";
import { LoadNextWeek } from "./LoadNextWeek";
import type { FC } from "react";
import type { EventType } from "../../types";

type Props = {
  events: EventType[],
  onLoadNextWeek: () => void,
  onNavigateToEvent: (calendarId: EventType["calendarId"], eventId: EventType["id"]) => void,
};

const Events: FC<Props> = ({ events, onLoadNextWeek, onNavigateToEvent }) => {
  const mapFilteredEvents = useMemo(() => getMapFilteredEventsByDay(events), [events]);

  return (size(events) === 0)
    ? (
      <Container>
        <P3>No events found in calendar(s)</P3>
      </Container>
    )
    : (
      <>
        {map(mapFilteredEvents, (value, day) => (
          <Fragment key={day}>
            <Container>
              <H1 style={{ marginBottom: 14 }}>{format(day, DAY_FORMAT)}</H1>
              {value.map((event) => <Event key={event.id} {...event} onNavigateToEvent={onNavigateToEvent} />)}
            </Container>
            <HorizontalDivider style={{ marginBottom: 10 }}/>
          </Fragment>
        ))}
        <LoadNextWeek onLoadNextWeek={onLoadNextWeek}/>
      </>
    )
};

export { Events };
