import { repeatIntervalValidator } from "../validators";

describe("repeatIntervalValidator", () => {
  test("should validation successfully", () => {
    expect(repeatIntervalValidator({ recurringType: 0, repeatInterval: 0 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 7 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 7 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 12 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 31 })).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 8 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 13 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 32 })).toBeFalsy();
  });
});
