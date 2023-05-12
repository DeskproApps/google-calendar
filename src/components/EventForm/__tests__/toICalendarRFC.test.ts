import { toICalendarRFC } from "../utils";

describe("toICalendarRFC", () => {
  test.each(
    ["", 1, -2, null, undefined, NaN]
  )("wrong value %p", (value) => {
    expect(toICalendarRFC(value as never)).toEqual([]);
  });

  describe("daily", () => {
    const options = {
      recurringType: 1,
      repeatInterval: 1,
      endRecurrenceDatetime: new Date("2023-06-12T18:00:00.000Z"),
    };

    test("should return daily event", () => {
      expect(toICalendarRFC(options as never))
        .toEqual(["RRULE:FREQ=DAILY;INTERVAL=1;UNTIL=20230612T180000Z"]);
    });

    test("should return daily event with interval", () => {
      expect(toICalendarRFC({ ...options, repeatInterval: 2 } as never))
        .toEqual(["RRULE:FREQ=DAILY;INTERVAL=2;UNTIL=20230612T180000Z"]);
    });

    test("should return daily event without end datetime", () => {
      expect(toICalendarRFC({ ...options, endRecurrenceDatetime: null } as never))
        .toEqual(["RRULE:FREQ=DAILY;INTERVAL=1"]);
    });
  });

  describe("weekly", () => {
    const options = {
      recurringType: 2,
      repeatInterval: 1,
      occursWeekly: [],
    };

    test("should return weekly event", () => {
      expect(toICalendarRFC({ ...options } as never))
        .toEqual(["RRULE:FREQ=WEEKLY;INTERVAL=1"]);
    });

    test("should return weekly event with interval", () => {
      expect(toICalendarRFC({ ...options, repeatInterval: 2 } as never))
        .toEqual(["RRULE:FREQ=WEEKLY;INTERVAL=2"]);
    });

    test("should return weekly event with specific days", () => {
      expect(toICalendarRFC({ ...options, occursWeekly: [2, 4, 6] } as never))
        .toEqual(["RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR"]);
    });
  });

  describe("monthly", () => {
    const options = {
      recurringType: 3,
      repeatInterval: 1,
      occursMonthly: 1,
    };

    test("should return monthly event", () => {
      expect(toICalendarRFC({ ...options } as never))
        .toEqual(["RRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=1"]);
    });

    test("should return monthly event with interval", () => {
      expect(toICalendarRFC({ ...options, repeatInterval: 2 } as never))
        .toEqual(["RRULE:FREQ=MONTHLY;INTERVAL=2;BYMONTHDAY=1"]);
    });

    test("should return monthly event with occurs on", () => {
      expect(toICalendarRFC({ ...options, occursMonthly: 5 } as never))
        .toEqual(["RRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTHDAY=5"]);
    });
  });
});
