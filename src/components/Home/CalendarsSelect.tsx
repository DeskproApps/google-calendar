import { useMemo, useCallback } from "react";
import size from "lodash/size";
import { getOption } from "../../utils";
import { Label, Select, Container } from "../common";
import type { FC } from "react";
import type { CalendarItem } from "../../services/google/types";
import type { Option } from "../../types";

type Props = {
  calendars: CalendarItem[],
  selectedCalendars: Array<CalendarItem["id"]>,
  onSelectedCalendar: (calendarId: CalendarItem["id"]) => void,
};

const CalendarsSelect: FC<Props> = ({ calendars, selectedCalendars, onSelectedCalendar }) => {
  const calendarOptions = useMemo(() => {
    return !size(calendars)
      ? []
      : calendars.map((calendar) => getOption(calendar.id, calendar.summary));
  }, [calendars]);

  const onChange = useCallback((o: Option<CalendarItem["id"]>) => {
    onSelectedCalendar(o.value);
  }, [onSelectedCalendar]);

  return (
    <Container>
      <Label htmlFor="calendars" label="Select Calendar(s)">
        <Select
          id="calendars"
          onChange={onChange}
          closeOnSelect={false}
          value={selectedCalendars}
          options={calendarOptions}
        />
      </Label>
    </Container>
  );
};

export { CalendarsSelect };
