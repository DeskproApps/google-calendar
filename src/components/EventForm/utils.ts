import size from "lodash/size";
import range from "lodash/range";
import isEmpty from "lodash/isEmpty";
import isPlainObject from "lodash/isPlainObject";
import { match } from "ts-pattern";
import { z } from "zod";
import { RRule } from "rrule";
import { getOption, getCurrentTimeZone } from "../../utils";
import { DAYS } from "./constants";
import {
  occursWeeklyValidator,
  occursMonthlyValidator,
  dailyDatetimeValidator,
  repeatIntervalValidator,
} from "./validators";
import { Recurrence } from "./types";
import type { Option } from "../../types";
import type {
  RecurrenceTypes,
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
  recurringType: z.number().min(1).max(3).optional(),
  repeatInterval: z.number().optional(),
  dailyEndDatetime: z.date().optional(),
  occursWeekly: z.number().array().optional(),
  occursMonthly: z.number().optional(),
})
  .refine(repeatIntervalValidator, {
    message: "Wrong interval",
    path: ["repeatInterval"],
  })
  .refine(dailyDatetimeValidator, {
    message: "The end recurrence date must be after the start or end event date",
    path: ["dailyEndDatetime"],
  })
  .refine(occursWeeklyValidator, {
    message: "Occurs require",
    path: ["occursWeekly"],
  })
  .refine(occursMonthlyValidator, {
    message: "Occurs require",
    path: ["occursMonthly"],
  });

const getInitEventValues = () => ({
  summary: "",
  description: "",
  location: "",
  recurring: false,
  attendees: [],
  recurringType: Recurrence.DAILY,
  repeatInterval: 1,
});

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5
 */
const toICalendarRFC = (options: EventFormValidationSchema): string[] => {
  if (isEmpty(options) || !isPlainObject(options)) {
    return [];
  }

  const {
    occursWeekly,
    recurringType,
    occursMonthly,
    repeatInterval,
    dailyEndDatetime,
  } = options;

  return match(recurringType)
    .with(Recurrence.DAILY, () => [RRule.optionsToString({
      freq: RRule.DAILY,
      interval: repeatInterval,
      until: dailyEndDatetime,
    })])
    .with(Recurrence.WEEKLY, () => [RRule.optionsToString({
      freq: RRule.WEEKLY,
      interval: repeatInterval,
      ...((Array.isArray(occursWeekly) && size(occursWeekly))
          ? { byweekday: occursWeekly.map((day) => match(day)
              .with(DAYS.Mon, () => RRule.MO)
              .with(DAYS.Tue, () => RRule.TU)
              .with(DAYS.Wed, () => RRule.WE)
              .with(DAYS.Thu, () => RRule.TH)
              .with(DAYS.Fri, () => RRule.FR)
              .with(DAYS.Sat, () => RRule.SA)
              .with(DAYS.Sun, () => RRule.SU)
              .run()) }
          : {}
      ),
    })])
    .with(Recurrence.MONTHLY, () => [RRule.optionsToString({
      freq: RRule.MONTHLY,
      interval: repeatInterval,
      bymonthday: occursMonthly,
    })])
    .otherwise(() => []);
};

const getEventValues = (
  values: EventFormValidationSchema,
): EventMeetingValues => {
  return {
    start: {
      dateTime: values.startTime.toISOString(),
      timeZone: getCurrentTimeZone(),
    },
    end: {
      dateTime: values.endTime.toISOString(),
      timeZone: getCurrentTimeZone(),
    },
    summary: values.summary,
    ...(isEmpty(values.description) ? {} : { description: values.description }),
    ...(isEmpty(values.location) ? {} : { location: values.location }),
    ...(isEmpty(values.attendees) ? {} : { attendees: values.attendees.map((email) => ({ email })) }),
    ...(!values.recurring ? {} : { recurrence: toICalendarRFC(values) })
  }
};

const getRepeatIntervalOptions = (
  recurringType?: RecurrenceTypes
): Array<Option<number>> => {
  return match(recurringType)
    .with(Recurrence.DAILY, () =>
      range(1, 8).map((value) => getOption<number>(value, `${value} day(s)`))
    )
    .with(Recurrence.WEEKLY, () =>
      range(1, 13).map((value) => getOption<number>(value, `${value} week(s)`))
    )
    .with(Recurrence.MONTHLY, () =>
      range(1, 13).map((value) => getOption<number>(value, `${value} month(s)`))
    )
    .otherwise(() => []);
};

const getOccursMonthlyOptions = () => {
  return range(1, 32).map((value) => getOption<number>(value, `${value}`));
};

export {
  getEventValues,
  toICalendarRFC,
  getInitEventValues,
  eventValidationSchema,
  getOccursMonthlyOptions,
  getRepeatIntervalOptions,
};
