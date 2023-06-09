import get from "lodash/get";
import size from "lodash/size";
import isAfter from "date-fns/isAfter";
import { match } from "ts-pattern";
import { Recurrence } from "./types";
import { z } from "zod";

const endRecurrenceDatetimeValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const startTime = get(values, ["startTime"]);
  const endTime = get(values, ["endTime"]);
  const endRecurrenceDatetime = get(values, ["endRecurrenceDatetime"]);

  if (!isRecurring) {
    return true;
  }

  if (!startTime || !endTime || !endRecurrenceDatetime) {
    return false;
  }

  if (!z.date().safeParse(endRecurrenceDatetime).success) {
    return false;
  }

  return isAfter(endRecurrenceDatetime, startTime) && isAfter(endRecurrenceDatetime, endTime);
};

const repeatIntervalValidator = <T>(values: T): boolean => {
  const repeatInterval = get(values, ["repeatInterval"]);

  return match(get(values, ["recurringType"]))
    .with(Recurrence.DAILY, () => repeatInterval >= 1 && repeatInterval <= 7)
    .with(Recurrence.WEEKLY, () => repeatInterval >= 1 && repeatInterval <= 12)
    .with(Recurrence.MONTHLY, () => repeatInterval >= 1 && repeatInterval <= 31)
    .otherwise(() => true);
};

const occursWeeklyValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isWeekly = get(values, ["recurringType"]) === Recurrence.WEEKLY;

  if (!isRecurring || !isWeekly) {
    return true;
  }

  return size(get(values, ["occursWeekly"])) > 0;
};

const occursMonthlyValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isMonthly = get(values, ["recurringType"]) === Recurrence.MONTHLY;

  if (!isRecurring || !isMonthly) {
    return true;
  }

  return get(values, ["occursMonthly"]) > 0;
};

export {
  occursWeeklyValidator,
  occursMonthlyValidator,
  repeatIntervalValidator,
  endRecurrenceDatetimeValidator,
};
