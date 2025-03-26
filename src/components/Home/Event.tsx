import { useCallback } from "react";
import { H3, P5 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { TIME_FORMAT } from "../../constants";
import { Link, CalendarLogo, TwoProperties, OverflowText } from "../common";
import type { FC, MouseEvent } from "react";
import type { EventType } from "../../types";

type Props = EventType & {
  onNavigateToEvent: (calendarId: EventType["calendarId"], eventId: EventType["id"]) => void,
};

const Event: FC<Props> = ({
  id,
  end,
  start,
  summary,
  htmlLink,
  calendarId,
  calendarSummary,
  onNavigateToEvent,
}) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToEvent(calendarId, id);
  }, [id, calendarId, onNavigateToEvent]);

  return (
    <>
      <Title
        as={H3}
        title={<Link href="#" onClick={onClick}>{summary ?? "Untitled event"}</Link>}
        link={htmlLink}
        icon={<CalendarLogo />}
        marginBottom={7}
      />
      <TwoProperties
        leftLabel="Time"
        leftText={formatEventTime(start, end)}
        rightLabel="Calendar"
        rightText={<OverflowText as={P5}>{calendarSummary}</OverflowText>}
        marginBottom={20}
      />
    </>
  );
};

export { Event };

function formatEventTime(start?: EventType["start"], end?: EventType["end"]) {
  let eventTimeString;

  if (start?.dateTime && end?.dateTime) {
    // If both start and end dateTime are present
    eventTimeString = `${format(start.dateTime, TIME_FORMAT)} - ${format(end.dateTime, TIME_FORMAT)}`;
  } else if (start?.dateTime) {
    // If only start dateTime is present
    eventTimeString = format(start.dateTime, TIME_FORMAT);
  } else if (end?.dateTime) {
    // If only end dateTime is present
    eventTimeString = format(end.dateTime, TIME_FORMAT);
  } else {
    // If neither dateTime is present, show as all-day event
    eventTimeString = "All day";
  }

  return eventTimeString
}
