import { cleanup } from "@testing-library/react";
import { getEventValues } from "../utils";

jest.mock("../../../utils/getCurrentTimeZone", () => ({
  getCurrentTimeZone: jest.fn(() => "Europe/Kiev"),
}));

describe("getEventValues", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should return values for simple event", () => {
    expect(getEventValues({
      summary: "Test simple event",
      startTime: new Date("2023-05-11T09:00:00.000Z"),
      endTime: new Date("2023-05-12T09:00:00.000Z"),
    } as never)).toEqual({
      summary: "Test simple event",
      start: { dateTime: "2023-05-11T09:00:00.000Z", timeZone: "Europe/Kiev" },
      end: { dateTime: "2023-05-12T09:00:00.000Z", timeZone: "Europe/Kiev" },
    });
  });

  test("should return event with full data and without recurrence", () => {
    expect(getEventValues({
      summary: "Test Event",
      startTime: new Date("2023-05-11T09:00:00.000Z"),
      endTime: new Date("2023-05-12T09:00:00.000Z"),
      description: "this is description",
      location: "https://location.url",
      attendees: ["lesia.ukrainka@me.ua"],
      recurring: false,
    })).toEqual({
      summary: "Test Event",
      start: { dateTime: "2023-05-11T09:00:00.000Z", timeZone: "Europe/Kiev" },
      end: { dateTime: "2023-05-12T09:00:00.000Z", timeZone: "Europe/Kiev" },
      description: "this is description",
      location: "https://location.url",
      attendees: [{ email: "lesia.ukrainka@me.ua" }],
    });
  });

  test("should return event with recurrence", () => {
    expect(getEventValues({
      summary: "Test event with recurrence",
      startTime: new Date("2023-05-11T09:00:00.000Z"),
      endTime: new Date("2023-05-12T09:00:00.000Z"),
      recurring: true,
      recurringType: 2,
      repeatInterval: 1,
      occursWeekly: [2, 4, 6],
    } as never)).toEqual({
      summary: "Test event with recurrence",
      start: { dateTime: "2023-05-11T09:00:00.000Z", timeZone: "Europe/Kiev" },
      end: { dateTime: "2023-05-12T09:00:00.000Z", timeZone: "Europe/Kiev" },
      recurrence: ["RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR"],
    });
  });
});
