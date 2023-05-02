import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../Home";
import { render } from "../../../../testing";

const events = [{
  "id": "tb34kdqm2cr96rvk2blhprpgks_20230503T083000Z",
  "summary": "All-Hands Engineering Stand Up",
  "htmlLink": "https://www.google.com/calendar/event?eid=dGIzNGtkcW0yY3I5NnJ2azJibGhwcnBna3NfMjAyMzA1MDNUMDgzMDAwWiB4enBhd254QG0",
  "start": {"dateTime": "2023-05-03T11:30:00+03:00", "timeZone": "Europe/Kiev"},
  "end": {"dateTime": "2023-05-03T12:00:00+03:00", "timeZone": "Europe/Kiev"},
  "calendarId": "xzpawnx@gmail.com",
  "calendarSummary": "xzpawnx@gmail.com"
}, {
  "id": "u12nn6nrp1jsnm3scr9u6b8j8t_20230502T084000Z",
  "summary": "Apps Stand Up",
  "htmlLink": "https://www.google.com/calendar/event?eid=dTEybm42bnJwMWpzbm0zc2NyOXU2YjhqOHRfMjAyMzA1MDJUMDg0MDAwWiB4enBhd254QG0",
  "start": {"dateTime": "2023-05-02T11:40:00+03:00", "timeZone": "Europe/Kiev"},
  "end": {"dateTime": "2023-05-02T11:50:00+03:00", "timeZone": "Europe/Kiev"},
  "calendarId": "xzpawnx@gmail.com",
  "calendarSummary": "xzpawnx@gmail.com"
}];

const calendars = [
  { id: "xzpawnx@gmail.com", summary: "xzpawnx@gmail.com" },
  { id: "usi9q4gc0eln2v7392tqb8k4k4@group.calendar.google.com", summary: "Activities"}
];

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <Home
        isLoading={false}
        events={[]}
        calendars={[]}
        selectedCalendars={[]}
        onSelectedCalendar={jest.fn()}
        onLoadNextWeek={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText("Select Calendar(s)")).toBeInTheDocument();
    expect(await findByText("No events found in calendar(s)")).toBeInTheDocument();
  });

  test("should render list of events", async () => {
    const { findByText } = render((
      <Home
        isLoading={false}
        events={events as never}
        calendars={calendars as never}
        selectedCalendars={["xzpawnx@gmail.com"]}
        onSelectedCalendar={jest.fn()}
        onLoadNextWeek={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/02 May, 2023/i)).toBeInTheDocument();
    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/03 May, 2023/i)).toBeInTheDocument();
    expect(await findByText(/All-Hands Engineering Stand Up/i)).toBeInTheDocument();
  });

  test("should load next week", async () => {
    const mockOnLoadNextWeek = jest.fn();
    const { findByRole } = render((
      <Home
        isLoading={false}
        events={events as never}
        calendars={calendars as never}
        selectedCalendars={["xzpawnx@gmail.com"]}
        onSelectedCalendar={jest.fn()}
        onLoadNextWeek={mockOnLoadNextWeek}
      />
    ), { wrappers: { theme: true } });

    const link = await findByRole("link", { name: "Load next week..." });

    await userEvent.click(link);

    await waitFor(() => {
      expect(mockOnLoadNextWeek).toHaveBeenCalled();
    });
  });
});
