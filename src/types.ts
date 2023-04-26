import type { To, ParamKeyValuePair } from "react-router-dom";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

/** Request types */
export type ApiRequestMethod = "GET" | "POST";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<T>;

/** Deskpro types */
export type Settings = {
  client_id?: string,
};

export type TicketData = object;

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "logout" }
;
