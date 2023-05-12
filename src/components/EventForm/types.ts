import { z } from "zod";
import { eventValidationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { Event, EventDateTime } from "../../services/google/types";

export type EventFormValidationSchema = z.infer<typeof eventValidationSchema>;

export type EventMeetingValues = {
  start: EventDateTime,
  end: EventDateTime,
  summary: Event["summary"],
  description?: Event["description"],
  location?: Event["location"],
  attendees?: Event["attendees"],
  recurrence?: string[],
};

export type EventFormProps = {
  error?: string|string[]|null,
  onSubmit: SubmitHandler<EventFormValidationSchema>,
  onCancel: () => void,
};

export type RecurrenceTypes =
  | 1 // Daily
  | 2 // Weekly
  | 3 // Monthly
;

export enum Recurrence {
  DAILY = 1,
  WEEKLY = 2,
  MONTHLY = 3,
}
