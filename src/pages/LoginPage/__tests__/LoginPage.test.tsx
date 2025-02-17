import { act } from "react";
import { cleanup, waitFor } from "@testing-library/react";
import { LoginPage } from "../LoginPage";
import { render } from "../../../../testing";
import { useLogin } from "../hooks";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../hooks", () => ({ useLogin: jest.fn() }));

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("renders login button properly", async () => {
    (useLogin as jest.Mock).mockImplementation(() => ({
      error: null,
      isAuth: false,
      authUrl: "https://call-back.url/?code=123",
      onSignIn: jest.fn(),
      isLoading: false,
    }));
    const { findByRole } = render(<LoginPage/>, { wrappers: { theme: true }});
    const loginButton = await findByRole("link", { name: /Log In/i });
  
    await waitFor(() => {
      expect(loginButton).toBeInTheDocument();
    });
  });

  test("triggers onSignIn when login button is clicked", async () => {
    const onSignIn = jest.fn();
    (useLogin as jest.Mock).mockImplementation(() => ({
      error: null,
      isAuth: false,
      isLoading: false,
      authUrl: "https://call-back.url/?code=123", 
      onSignIn,
    }));
    const { findByRole } = render(<LoginPage/>, { wrappers: { theme: true }});
  
    const loginButton = await findByRole("link", { name: /Log In/i });
  
    await act(async () => {
      await userEvent.click(loginButton);
    });
  
    expect(onSignIn).toHaveBeenCalledTimes(1)
  });
});
