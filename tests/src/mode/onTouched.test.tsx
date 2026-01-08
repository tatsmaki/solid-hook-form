import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const minLength = 5;
const badResult = "test";
const okResult = "long-string";
const errorMessage = "Min length is 5";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("onTouched mode", () => {
  it("should validate on first blur, then on every change", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        mode="onTouched"
        render={({ register, errors }) => (
          <>
            <Input
              {...register("email", { minLength: { value: minLength, message: errorMessage } })}
              error={errors.email}
            />
            <Input
              {...register("password", { minLength: { value: minLength, message: errorMessage } })}
              error={errors.password}
            />
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    // Input event should NOT trigger validation before first blur event
    await emailInput.fill(badResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();

    // First blur event should trigger validation
    await emailInput.click();
    await userEvent.tab();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage(errorMessage);
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    // Input event should NOT trigger validation before first blur event
    await passwordInput.fill(badResult);
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    // First blur event should trigger validation
    await emailInput.click();
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAccessibleErrorMessage(errorMessage);

    // Input event should re-validate
    await emailInput.fill(okResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();
  });

  it("should validate on submit event", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        mode="onChange"
        render={({ register, errors }) => (
          <>
            <Input
              {...register("email", { minLength: { value: minLength, message: errorMessage } })}
              error={errors.email}
            />
            <Input
              {...register("password", { minLength: { value: minLength, message: errorMessage } })}
              error={errors.password}
            />
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    // Submit event should trigger validation
    await submitButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage(errorMessage);
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAccessibleErrorMessage(errorMessage);
    expect(onSubmit).not.toHaveBeenCalled();

    // Input event should re-validate
    await emailInput.fill(okResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();
    await passwordInput.fill(okResult);
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    // Submit should succeed with valid value
    await submitButton.click();
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult, password: okResult });
  });
});
