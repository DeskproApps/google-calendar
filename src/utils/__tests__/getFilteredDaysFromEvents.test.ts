import { getFilteredDaysFromEvents } from "../getFilteredDaysFromEvents";
import mockEvents from "../../../testing/mocks/mockEvents.json";

describe("getFilteredDaysFromEvents", () => {
  test("should return empty array", () => {
    expect(getFilteredDaysFromEvents()).toEqual([]);
    expect(getFilteredDaysFromEvents([])).toEqual([]);
  });

  test("should return filtered days from events", () => {
    expect(getFilteredDaysFromEvents(mockEvents)).toEqual([
      "2021-02-15T00:00:00.000Z",
      "2021-02-16T00:00:00.000Z",
      "2021-02-17T00:00:00.000Z",
      "2021-02-18T00:00:00.000Z",
      "2021-02-19T00:00:00.000Z",
      "2022-06-14T00:00:00.000Z",
      "2022-07-21T00:00:00.000Z",
      "2023-04-05T00:00:00.000Z",
      "2023-04-19T00:00:00.000Z",
      "2023-04-24T00:00:00.000Z",
      "2023-05-01T00:00:00.000Z",
      "2023-05-03T00:00:00.000Z",
      "2023-05-06T00:00:00.000Z",
    ]);
  });
});
