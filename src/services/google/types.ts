import type { DateTime } from "../../types";

export type OAuthToken = {
  token_type: "Bearer"
  access_token: string,
  expires_in: number,
  id_token: string,
  scope: string,
};

export type GoogleRestError = {
  error: {
    code: number,
    message: string,
  }
};

export type CalendarItem = {
  kind: "calendar#calendarListEntry",
  etag: string,
  id: string,
  summary: string,
  description: string,
  timeZone: string, // "Europe/Kiev",
  summaryOverride: string,
  colorId: string, // "7",
  backgroundColor: string, // "#42d692",
  foregroundColor: string, // "#000000",
  selected: boolean,
  accessRole: string,
  defaultReminders?: Array<{
    "method": "popup",
    "minutes": 10
  }>,
  conferenceProperties: {
    allowedConferenceSolutionTypes: string[],
  },
  notificationSettings?: {
    notifications: Array<{
      type: "eventCreation"|"eventChange"|"eventCancellation"|"eventResponse",
      method: "email"
    }>,
  },
  primary?: boolean,
};

export type CalendarList = {
  kind: "calendar#calendarList",
  etag: string,
  nextSyncToken: string,
  items: CalendarItem[],
};

export type EventItem = {
  kind: "calendar#event",
  etag: string,
  id: string,
  status: string, // "confirmed",
  htmlLink: string,
  created: DateTime,
  updated: DateTime,
  summary: string,
  description: string,
  creator: { email: string },
  organizer: { email: string, displayName: string, self: boolean },
  start: { dateTime: DateTime, timeZone: string },
  end: { dateTime: DateTime, timeZone: string },
  recurrence: string[],
  iCalUID: string,
  sequence: number,
  reminders: { useDefault: boolean },
  eventType: string, // "default"
};

export type CalendarEvents = {
  kind: "calendar#events",
  etag: string,
  summary: CalendarItem["summary"],
  updated: DateTime,
  timeZone: string, // "Europe/Kiev",
  accessRole: string, // "reader",
  defaultReminders: never,
  nextSyncToken: string,
  items: EventItem[],
};
