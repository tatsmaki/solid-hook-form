import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const errorMessage = "This field is required";
const validValue = "valid@example.com";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("setValue", () => {
  it("should setValue", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ errors, register, setValue }) => (
          <>
            <Input {...register("email", { required: errorMessage })} error={errors.email} />

            <button type="button" onClick={() => setValue("email", "")}>
              Set invalid
            </button>
            <button type="button" onClick={() => setValue("email", validValue)}>
              Set valid
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const setInvalidButton = page.getByRole("button", { name: "Set invalid" });
    const setValidButton = page.getByRole("button", { name: "Set valid" });

    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("aria-invalid", "false");

    await setInvalidButton.click();
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    await setValidButton.click();
    expect(input).toHaveValue(validValue);
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();
  });

  it("should setValue and validate", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ errors, register, setValue }) => (
          <>
            <Input {...register("email", { required: errorMessage })} error={errors.email} />

            <button type="button" onClick={() => setValue("email", "", { shouldValidate: true })}>
              Set invalid
            </button>
            <button
              type="button"
              onClick={() => setValue("email", validValue, { shouldValidate: true })}
            >
              Set valid
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const setInvalidButton = page.getByRole("button", { name: "Set invalid" });
    const setValidButton = page.getByRole("button", { name: "Set valid" });

    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("aria-invalid", "false");

    await setInvalidButton.click();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleErrorMessage(errorMessage);

    await setValidButton.click();
    expect(input).toHaveValue(validValue);
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();
  });
});
