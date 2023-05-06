import isEmpty from "lodash/isEmpty";
import { z } from "zod";
import type {
  EventMeetingValues,
  EventFormValidationSchema,
} from "./types";

const eventValidationSchema = z.object({
  summary: z.string().nonempty(),
  startTime: z.date(),
  endTime: z.date(),
  description: z.string().optional(),
  location: z.string().optional(),
  recurring: z.boolean(),
  attendees: z.array(z.string().email()),
});

const getInitEventValues = () => ({
  summary: "",
  description: "",
  location: "",
  recurring: false,
  attendees: [],
});

const getEventValues = (
  values: EventFormValidationSchema,
): EventMeetingValues => {
  return {
    start: { dateTime: values.startTime.toISOString() },
    end: { dateTime: values.endTime.toISOString() },
    summary: values.summary,
    ...(isEmpty(values.description) ? {} : { description: values.description }),
    ...(isEmpty(values.location) ? {} : { location: values.location }),
    ...(isEmpty(values.attendees) ? {} : {
      attendees: values.attendees.map((email) => ({ email }))
    }),
  }
};

export { eventValidationSchema, getInitEventValues, getEventValues };
