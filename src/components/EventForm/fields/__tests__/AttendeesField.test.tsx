import { act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { AttendeesField } from "../AttendeesField";

describe("AttendeesField", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole } = render((
      <AttendeesField id="attendees" value={[]} onChange={jest.fn()}/>
    ), { wrappers: { theme: true } });

    const input = await findByRole("textbox") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("should render when pass value", async () => {
    const { findByText } = render((
      <AttendeesField value={["roman.shukhevych@me.ua", "stepan.bandera@me.ua"]} onChange={jest.fn()}/>
    ), { wrappers: { theme: true } });

    expect(await findByText(/roman.shukhevych@me.ua/i)).toBeInTheDocument();
    expect(await findByText(/stepan.bandera@me.ua/i)).toBeInTheDocument();
  });

  test("should clear input", async () => {
    const { findByRole } = render((
      <AttendeesField value={[]} onChange={jest.fn()}/>
    ), { wrappers: { theme: true } });

    const input = await findByRole("textbox") as HTMLInputElement;
    const clearButton = await findByRole("button");

    await act(async () => {
      await userEvent.type(input, "taras.shevchenko@me.ua");
    })

    expect(input.value).toBe("taras.shevchenko@me.ua");

    await act(async () => {
      await userEvent.click(clearButton);
    });

    expect(input.value).toBe("");
  });

  test("should remove email", async () => {
    const onChange = jest.fn();
    const { findByText, container } = render((
      <AttendeesField
        value={["roman.shukhevych@me.ua", "stepan.bandera@me.ua"]}
        onChange={onChange}
      />
    ), { wrappers: { theme: true } });

    const removeButtons = container.querySelectorAll("div.tag button");

    expect(await findByText(/roman.shukhevych@me.ua/i)).toBeInTheDocument();
    expect(await findByText(/stepan.bandera@me.ua/i)).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(removeButtons[0]);
    });

    expect(onChange).toHaveBeenCalledWith(["stepan.bandera@me.ua"]);
  });

  test("should add email", async () => {
    const onChange = jest.fn();

    const { findByRole } = render((
      <AttendeesField value={[]} onChange={onChange}/>
    ), { wrappers: { theme: true } });

    const input = await findByRole("textbox") as HTMLInputElement;

    await act(async () => {
      await userEvent.type(input, "stepan.bandera@me.ua");
      await userEvent.type(input, '{enter}');
    });

    expect(onChange).toHaveBeenCalledWith(["stepan.bandera@me.ua"]);
  });

  test("should not add email when invalid", async () => {
    const onChange = jest.fn();
    const { findByRole } = render((
      <AttendeesField value={[]} onChange={onChange} />
    ), { wrappers: { theme: true } });

    const input = await findByRole("textbox") as HTMLInputElement;

    await act(async () => {
      await userEvent.type(input, "taras.shevchenko");
      await userEvent.type(input, '{enter}');
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
