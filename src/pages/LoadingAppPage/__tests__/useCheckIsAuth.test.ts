import { useNavigate } from "react-router-dom";
import { waitFor, renderHook, cleanup } from "@testing-library/react";
import { useCheckIsAuth } from "../hooks";
import { getCalendarsService } from "../../../services/google";
import { useLogout } from "../../../hooks";
import mockCalendars from "../../../../testing/mocks/mockCalendars.json";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/google/getCalendarsService");
jest.mock("../../../hooks/useLogout");

describe("useCheckIsAuth", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should go to the main page if we have access token and receive user data", async () => {
    const logout = jest.fn();
    const navigate = jest.fn();
    (useLogout as jest.Mock).mockImplementation(() => ({ logout }));
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (getCalendarsService as jest.Mock).mockResolvedValueOnce(mockCalendars);

    renderHook<void, unknown>(() => useCheckIsAuth());

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });

  test("should call logout", async () => {
    const logout = jest.fn();
    (useLogout as jest.Mock).mockImplementation(() => ({ logout }));
    (getCalendarsService as jest.Mock).mockRejectedValueOnce(new Error());

    renderHook<void, unknown>(() => useCheckIsAuth());

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});
