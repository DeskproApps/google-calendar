import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { TIME_FORMAT } from "../../constants";
import { CalendarLogo, TwoProperties } from "../common";
import type { FC } from "react";
import type { EventType } from "../../types";

const Event: FC<EventType> = ({ summary, htmlLink, start, end, calendarSummary }) => {
  return (
    <>
      <Title
        title={summary}
        link={htmlLink}
        icon={<CalendarLogo />}
        marginBottom={7}
      />
      <TwoProperties
        leftLabel="Time"
        leftText={`${format(start.dateTime, TIME_FORMAT)} - ${format(end.dateTime, TIME_FORMAT)}`}
        rightLabel="Calendar"
        rightText={calendarSummary}
        marginBottom={20}
      />
    </>
  );
};

export { Event };
