import pick from "lodash/pick";
import omit from "lodash/omit";
import { dailyDatetimeValidator } from "../validators";

describe("dailyDatetimeValidator", () => {
  const values = {
    recurring: true,
    startTime: new Date("2023-05-10T12:00:00.000Z"),
    endTime: new Date("2023-05-10T13:00:00.000Z"),
    dailyEndDatetime: new Date("2023-05-12T18:00:00.000Z"),
  };

  test("should be recurring", () => {
    expect(dailyDatetimeValidator({ recurring: false })).toBeTruthy()
  });

  test("should be require", () => {
    expect(dailyDatetimeValidator(pick(values, ["recurring", "startTime"]))).toBeFalsy();
    expect(dailyDatetimeValidator(pick(values, ["recurring", "endTime"]))).toBeFalsy();
    expect(dailyDatetimeValidator(pick(values, ["recurring", "dailyEndDatetime"]))).toBeFalsy();

    expect(dailyDatetimeValidator(omit(values, ["startTime"]))).toBeFalsy();
    expect(dailyDatetimeValidator(omit(values, ["endTime"]))).toBeFalsy();
    expect(dailyDatetimeValidator(omit(values, ["dailyEndDatetime"]))).toBeFalsy();
  });

  test.each(
    ["", 1, -2, null, undefined, NaN, "2023-05-12T18:00:00.000Z"]
  )("should be a date: %p", (value) => {
    expect(dailyDatetimeValidator({ ...values, dailyEndDatetime: value })).toBeFalsy();
  });

  test("should be after start and end datetime", () => {
    const data = { ...values, dailyEndDatetime: new Date("2023-05-09T18:00:00.000Z") };
    expect(dailyDatetimeValidator(data)).toBeFalsy();
  });
});
