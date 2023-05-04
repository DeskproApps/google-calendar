import { match } from "ts-pattern";
import get from "lodash/get";
import size from "lodash/size";
import { faCheck, faX, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { P5, Stack, TagCircleIcon } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { EVENT_FORMAT } from "../../constants";
import { linkRenderer } from "../../utils";
import {
  Property,
  Container,
  MdContainer,
  OverflowText,
  CalendarLogo,
} from "../common";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Event, CalendarItem } from "../../services/google/types";

type Props = {
  event: Event,
  calendar: CalendarItem,
};

const EventDetails: FC<Props> = ({ event, calendar }) => {
  const isAttendees = !Array.isArray(get(event, ["attendees"])) || !size(get(event, ["attendees"]));
  return (
    <Container>
      <Title
        title={get(event, ["summary"], "-")}
        link={get(event, ["htmlLink"], "")}
        icon={<CalendarLogo />}
      />

      <Property label="Calendar" text={get(calendar, ["summary"], "-")} />

      <Property
        label="Description"
        text={(
          <P5 dangerouslySetInnerHTML={{ __html: get(event, ["description"], "-") }} />
        )}
      />

      <Property
        label="Start date"
        text={format(get(event, ["start", "dateTime"]), EVENT_FORMAT)}
      />

      <Property
        label="End date"
        text={format(get(event, ["end", "dateTime"]), EVENT_FORMAT)}
      />

      <Property
        label="Attendees"
        text={isAttendees ? "-" : (
          <>
            {(event?.attendees || []).map((attendee) => (
              <Stack gap={6} align="center">
                <P5 key={attendee.email}>
                  <OverflowText>{attendee?.displayName ?? attendee?.email ?? "-"}</OverflowText>
                </P5>
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

      <Property label="Creator" text={get(event, ["creator", "email"], "-")} />

      <Property
        label="Location"
        text={(
          <MdContainer
            dangerouslySetInnerHTML={{
              __html: linkRenderer(get(event, ["location"], "-")),
            }}
          />
        )}
      />
    </Container>
  );
};

export { EventDetails };
