import get from "lodash/get";
import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { EventDetails } from "../EventDetails";
import mockEvent from "../../../../testing/mocks/mockEvent.json";
import mockCalendars from "../../../../testing/mocks/mockCalendars.json";

describe("EventDetails", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <EventDetails event={mockEvent as never} calendar={get(mockCalendars, ["items", 0]) as never} />
    ), { wrappers: { theme: true } });

    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/xzpawnx@gmail.com/i)).toBeInTheDocument();
    expect(await findByText(/this is description/i)).toBeInTheDocument();
    expect(await findByText(/Friday, May 5 8:40/i)).toBeInTheDocument();
    expect(await findByText(/Friday, May 5 8:50/i)).toBeInTheDocument();
    expect(await findByText(/xzpawnx@email.com/i)).toBeInTheDocument();
    expect(await findByText(/david@domain.com/i)).toBeInTheDocument();
    expect(await findByText(/ash@email.com/i)).toBeInTheDocument();
    expect(await findByText(/dan@email.com/i)).toBeInTheDocument();
    expect(await findByText(/ilia.makarov@gmail.com/i)).toBeInTheDocument();
    expect(await findByText(/this is location/i)).toBeInTheDocument();
  });

});
