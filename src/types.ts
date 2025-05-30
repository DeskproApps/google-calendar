import type { To, ParamKeyValuePair } from "react-router-dom";
import type {
  Context,
  IDeskproClient
} from "@deskpro/app-sdk";
import type {
  DropdownValueType,
} from "@deskpro/deskpro-ui";
import type { EventItem, CalendarItem } from "./services/google/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** The date, in the format "yyyy-mm-dd" */
export type DateType = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: string | Dict<string> | ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<T>;

/** Deskpro types */
export type Settings = {
  client_id?: string,
  use_advanced_connect?: boolean,

};

export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "logout" }
  ;

/** Entities */
export type EventType = {
  id: EventItem["id"],
  summary: EventItem["summary"],
  htmlLink: EventItem["htmlLink"],
  start: EventItem["start"],
  end: EventItem["end"],
  calendarId: CalendarItem["id"],
  calendarSummary: CalendarItem["summary"],
};
