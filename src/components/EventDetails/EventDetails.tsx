import { CalendarLogo, Container, MdContainer, OverflowText, Property } from "../common";
import { EVENT_FORMAT } from "../../constants";
import { faCheck, faX, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { format } from "../../utils/date";
import { linkRenderer } from "../../utils";
import { match } from "ts-pattern";
import { P5, Stack, TagCircleIcon } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Event, CalendarItem } from "../../services/google/types";
import type { FC } from "react";

type Props = {
  event: Event,
  calendar: CalendarItem,
};

const EventDetails: FC<Props> = ({ event, calendar }) => {
  const isAttendees = Array.isArray(event?.attendees) && event.attendees.length > 0;

  return (
    <Container>
      <Title
        title={event?.summary ?? "Untitled Event"}
        link={event?.htmlLink ?? "#"}
        icon={<CalendarLogo />}
      />

      <Property label="Calendar" text={calendar?.summary ?? "-"} />

      <Property
        label="Description"
        text={(
          <P5 dangerouslySetInnerHTML={{ __html: event?.description ?? "-" }} />
        )}
      />

      <Property
        label="Start date"
        text={format(event?.start?.dateTime ?? event?.start?.date, EVENT_FORMAT)}
      />

      <Property
        label="End date"
        text={format(event?.end?.dateTime ?? event?.end?.date, EVENT_FORMAT)}
      />

      <Property
        label="Attendees"
        text={!isAttendees ? "-" : (
          <>
            {(event.attendees || []).map((attendee) => (
              <Stack gap={6} align="center" key={attendee?.email}>
                <OverflowText as={P5}>
                  {attendee?.displayName ?? attendee?.email ?? "-"}
                </OverflowText>
                {match(attendee.responseStatus)
                  .with("accepted", () => <TagCircleIcon color="turquoise" icon={faCheck as AnyIcon} size={14} iconSize={7} />)
                  .with("declined", () => <TagCircleIcon color="red" icon={faX as AnyIcon} size={14} iconSize={7} />)
                  .with("tentative", () => <TagCircleIcon color="grey" icon={faQuestion as AnyIcon} size={14} iconSize={7} />)
                  .otherwise(() => null)}
              </Stack>
            ))}
          </>
        )}
      />

      <Property label="Creator" text={event?.creator?.email ?? "-"} />

      <Property
        label="Location"
        text={(
          <MdContainer
            dangerouslySetInnerHTML={{
              __html: linkRenderer(event?.location ?? "-"),
            }}
          />
        )}
      />
    </Container>
  );
};

export { EventDetails };
