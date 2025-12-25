import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("setError", () => {
  it("should set error", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, setError }) => (
          <>
            <Input {...register("email")} error={errors.email} />
            <button
              type="button"
              onClick={() => setError("email", { type: "custom", message: "Custom message" })}
            >
              setError
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const setError = page.getByRole("button", { name: "setError" });

    await setError.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage("Custom message");
    expect(emailInput).not.toHaveFocus();
  });

  it("should set error and focus", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, setError }) => (
          <>
            <Input {...register("email")} error={errors.email} />
            <button
              type="button"
              onClick={() =>
                setError(
                  "email",
                  { type: "custom", message: "Custom message" },
                  { shouldFocus: true }
                )
              }
            >
              setError
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const setError = page.getByRole("button", { name: "setError" });

    await setError.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage("Custom message");
    expect(emailInput).toHaveFocus();
  });

  it("should prevent submit", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, setError }) => (
          <>
            <Input {...register("email")} error={errors.email} />
            <button
              type="button"
              onClick={() => setError("email", { type: "custom", message: "Custom message" })}
            >
              setError
            </button>
          </>
        )}
        submitButton={({ formState }) => (
          <button type="submit" disabled={!formState.isValid()}>
            Submit
          </button>
        )}
        onSubmit={onSubmit}
      />
    ));

    const setError = page.getByRole("button", { name: "setError" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeEnabled();

    await setError.click();
    expect(submitButton).toBeDisabled();
  });
});
