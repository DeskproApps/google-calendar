import type { DateTime, DateType } from "../../types";

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

export type User = {
  email:	string,
  self?:	boolean,
  displayName?:	string,
  id?:	string,
};

export type EventDateTime = {
  date?: DateType,
  dateTime: DateTime
  timeZone: string,
};

export type Attendee = {
  id: string,
  email: string,
  responseStatus: "needsAction"|"declined"|"tentative"|"accepted",
  displayName?: string,
  comment?: string,
  additionalGuests?: number,
  optional?: boolean,
  organizer?: boolean,
  resource?: boolean,
  self?: boolean,
};

export type Reminder = { method: "email"|"popup", minutes: number };

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
  defaultReminders?: Reminder[],
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
  creator: User,
  organizer: User,
  start: EventDateTime,
  end: EventDateTime,
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

export type Event = {
  kind: string,
  etag: string,
  id: EventItem["id"],
  status: "confirmed"|"tentative"|"cancelled",
  htmlLink: string,
  created: DateTime,
  updated: DateTime,
  summary: string,
  description: string,
  location: string,
  creator: User,
  organizer: User,
  start: EventDateTime,
  end: EventDateTime,
  recurringEventId: string,
  originalStartTime: EventDateTime,
  iCalUID: string,
  sequence: number,
  attendees: Attendee[],
  extendedProperties: never,
  guestsCanInviteOthers: boolean,
  reminders: {
    useDefault?: boolean,
    overrides?: Reminder[],
  },
  eventType: "default"|"outOfOffice"|"focusTime"|"workingLocation",
};
