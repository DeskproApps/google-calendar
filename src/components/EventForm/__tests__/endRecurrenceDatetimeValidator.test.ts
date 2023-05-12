import pick from "lodash/pick";
import omit from "lodash/omit";
import { endRecurrenceDatetimeValidator } from "../validators";

describe("endRecurrenceDatetimeValidator", () => {
  const values = {
    recurring: true,
    startTime: new Date("2023-05-10T12:00:00.000Z"),
    endTime: new Date("2023-05-10T13:00:00.000Z"),
    endRecurrenceDatetime: new Date("2023-05-12T18:00:00.000Z"),
  };

  test("should be recurring", () => {
    expect(endRecurrenceDatetimeValidator({ recurring: false })).toBeTruthy()
  });

  test("should be require", () => {
    expect(endRecurrenceDatetimeValidator(pick(values, ["recurring", "startTime"]))).toBeFalsy();
    expect(endRecurrenceDatetimeValidator(pick(values, ["recurring", "endTime"]))).toBeFalsy();
    expect(endRecurrenceDatetimeValidator(pick(values, ["recurring", "endRecurrenceDatetime"]))).toBeFalsy();

    expect(endRecurrenceDatetimeValidator(omit(values, ["startTime"]))).toBeFalsy();
    expect(endRecurrenceDatetimeValidator(omit(values, ["endTime"]))).toBeFalsy();
    expect(endRecurrenceDatetimeValidator(omit(values, ["endRecurrenceDatetime"]))).toBeFalsy();
  });

  test.each(
    ["", 1, -2, null, undefined, NaN, "2023-05-12T18:00:00.000Z"]
  )("should be a date: %p", (value) => {
    expect(endRecurrenceDatetimeValidator({ ...values, endRecurrenceDatetime: value })).toBeFalsy();
  });

  test("should be after start and end datetime", () => {
    const data = { ...values, endRecurrenceDatetime: new Date("2023-05-09T18:00:00.000Z") };
    expect(endRecurrenceDatetimeValidator(data)).toBeFalsy();
  });
});
