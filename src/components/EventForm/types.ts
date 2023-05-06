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
};

export type EventFormProps = {
  onSubmit: SubmitHandler<EventFormValidationSchema>,
  onCancel: () => void,
};
