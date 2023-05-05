import get from "lodash/get";
import size from "lodash/size";
import concat from "lodash/concat";
import { getCalendarsService, getEventsService } from "../../services/google";
import { useQueryWithClient, useQueriesWithClient } from "../../hooks";
import { QueryKey } from "../../query";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { CalendarItem, EventItem, CalendarEvents, CalendarList } from "../../services/google/types";
import type { EventType, DateTime } from "../../types";

type UseCalendars = (timeMax: DateTime) => {
  isLoading: boolean,
  events: EventType[],
  calendars: CalendarItem[],
};

const useCalendars: UseCalendars = (timeMax) => {
  const calendars = useQueryWithClient<CalendarList, unknown, CalendarItem[]>(
    [QueryKey.CALENDARS],
    (client) => getCalendarsService(client),
    { select: (data) => get(data, "items", []) },
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need to fix hook typings
  const events = useQueriesWithClient<EventType[]>((get(calendars, ["data"], []) || []).map(({ id }: CalendarItem) => ({
    queryKey: [QueryKey.CALENDARS, id, "events", timeMax],
    queryFn: (client: IDeskproClient) => getEventsService(client, id, timeMax),
    enabled: size(get(calendars, ["data"], [])) > 0,
    retry: false,
    useErrorBoundary: false,
    select: (data: CalendarEvents) => get(data, ["items"], []).map((event: EventItem) => ({
      id: event.id,
      summary: event.summary,
      htmlLink: event.htmlLink,
      start: event.start,
      end: event.end,
      calendarId: id,
      calendarSummary: get(data, ["summary"], "-"),
    })),
  })));

  return {
    isLoading: [calendars, ...events].every(({ isLoading }) => isLoading),
    calendars: (get(calendars, ["data"], []) || []) as CalendarItem[],
    events: concat(...events.map((calendarEvents) => {
      return get(calendarEvents, ["data"], []) || [];
    })) as EventType[],
  };
};

export { useCalendars };
