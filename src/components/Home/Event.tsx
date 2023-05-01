import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { DATETIME_FORMAT } from "../../constants";
import { CalendarLogo, TwoProperties } from "../common";
import type { FC } from "react";
import type { EventType } from "../../types";

const Event: FC<EventType> = (props) => {
  return (
    <>
      <Title
        title={props.summary}
        link={props.htmlLink}
        icon={<CalendarLogo />}
        marginBottom={7}
      />
      <TwoProperties
        leftLabel="Time"
        leftText={`${format(props.start.dateTime, DATETIME_FORMAT)} - ${format(props.end.dateTime, DATETIME_FORMAT)}`}
        rightLabel="Calendar"
        rightText={props.calendarSummary}
        marginBottom={20}
      />
    </>
  );
};

export { Event };
