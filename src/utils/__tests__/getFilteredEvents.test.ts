import { getFilteredEvents } from "../getFilteredEvents";

const mockEvents = [
  { id: "event1", calendarId: "calendar1" },
  { id: "event2", calendarId: "calendar1" },
  { id: "event3", calendarId: "calendar2" },
  { id: "event4", calendarId: "calendar3" },
  { id: "event5", calendarId: "calendar1" },
];

describe("getFilteredEvents", () => {
  test.each(
    [undefined, null, "", 0, true, false, {}]
  )("wrong value: %p", (payload) => {
    expect(getFilteredEvents([] as never, payload as never)).toEqual([]);
  });

  test("should return filtered events", () => {
    expect(getFilteredEvents(["calendar1"] as never, mockEvents as never))
      .toStrictEqual([
        { id: "event1", calendarId: "calendar1" },
        { id: "event2", calendarId: "calendar1" },
        { id: "event5", calendarId: "calendar1" },
      ]);
    expect(getFilteredEvents(["calendar2", "calendar3"] as never, mockEvents as never))
      .toStrictEqual([
        { id: "event3", calendarId: "calendar2" },
        { id: "event4", calendarId: "calendar3" },
      ]);
  });
});
