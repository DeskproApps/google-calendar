import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../Home";
import { render } from "../../../../testing";

const events = [{
  "id": "001",
  "summary": "All-Hands Engineering Stand Up",
  "htmlLink": "https://www.google.com/calendar/event?eid=001",
  "start": {"dateTime": "2023-05-03T11:30:00+03:00", "timeZone": "Europe/Kiev"},
  "end": {"dateTime": "2023-05-03T12:00:00+03:00", "timeZone": "Europe/Kiev"},
  "calendarId": "calendar001",
  "calendarSummary": "xzpawnx@gmail.com"
}, {
  "id": "002",
  "summary": "Apps Stand Up",
  "htmlLink": "https://www.google.com/calendar/event?eid=002",
  "start": {"dateTime": "2023-05-02T11:40:00+03:00", "timeZone": "Europe/Kiev"},
  "end": {"dateTime": "2023-05-02T11:50:00+03:00", "timeZone": "Europe/Kiev"},
  "calendarId": "calendar001",
  "calendarSummary": "xzpawnx@gmail.com"
}];

const calendars = [
  { id: "calendar001", summary: "xzpawnx@gmail.com" },
  { id: "calendar002", summary: "Activities"}
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
        onNavigateToEvent={jest.fn()}
        onNavigateToCreateEvent={jest.fn()}
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
        onNavigateToEvent={jest.fn()}
        onNavigateToCreateEvent={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/Tue, May 2/i)).toBeInTheDocument();
    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/Wed, May 3/i)).toBeInTheDocument();
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
        onNavigateToEvent={jest.fn()}
        onNavigateToCreateEvent={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const link = await findByRole("link", { name: "Load next week..." });

    await userEvent.click(link);

    await waitFor(() => {
      expect(mockOnLoadNextWeek).toHaveBeenCalled();
    });
  });

  test("should navigate to event", async () => {
    const mockOnNavigateToEvent = jest.fn();

    const { findByRole } = render((
      <Home
        isLoading={false}
        events={events as never}
        calendars={calendars as never}
        selectedCalendars={["xzpawnx@gmail.com"]}
        onSelectedCalendar={jest.fn()}
        onLoadNextWeek={jest.fn()}
        onNavigateToEvent={mockOnNavigateToEvent}
        onNavigateToCreateEvent={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const link = await findByRole("link", { name: "Apps Stand Up" });

    await userEvent.click(link);

    await waitFor(() => {
      expect(mockOnNavigateToEvent).toHaveBeenCalled();
    });
  });

  test.todo("should navigate to event creation");
});
