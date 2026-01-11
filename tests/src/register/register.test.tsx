import { createSignal, Show } from "solid-js";
import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("register", () => {
  it("should register", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ register }) => <Input {...register("email")} />}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await input.fill("test");
    await submit.click();

    expect(onSubmit).toHaveBeenCalledWith({ email: "test" });
  });

  it("should handle conditional render", async () => {
    const emailBadResult = "email";
    const pattern = /^[^@]+@[^@]+.[^@]+$/;
    const emailOkResult = "email@example.com";
    const emailErrorMessage = "Invalid email";
    const passwordBadResult = "pass";
    const minLength = 5;
    const passwordOkResult = "password123";
    const passwordErrorMessage = "Min length is 5";

    const page = render(() => {
      const [formStep, setFormStep] = createSignal(0);

      return (
        <Form
          defaultValues={{
            email: "",
            password: ""
          }}
          render={({ errors, register }) => (
            <>
              <Show when={formStep() === 0}>
                <Input
                  {...register("email", {
                    pattern: { value: pattern, message: emailErrorMessage }
                  })}
                  error={errors.email}
                />
              </Show>
              <Show when={formStep() === 1}>
                <Input
                  {...register("password", {
                    minLength: { value: minLength, message: passwordErrorMessage }
                  })}
                  error={errors.password}
                />
              </Show>
              <button type="button" onClick={() => setFormStep(0)}>
                Step 1
              </button>
              <button type="button" onClick={() => setFormStep(1)}>
                Step 2
              </button>
            </>
          )}
          onSubmit={onSubmit}
        />
      );
    });

    const emailInput = page.getByRole("textbox", { name: "email" });
    const step1Button = page.getByRole("button", { name: "Step 1" });
    const step2Button = page.getByRole("button", { name: "Step 2" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(emailInput).toHaveValue("");

    await emailInput.fill(emailBadResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage(emailErrorMessage);
    await step2Button.click();

    const passwordInput = page.getByRole("textbox", { name: "password" });
    expect(passwordInput).toHaveValue("");

    await passwordInput.fill(passwordBadResult);
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAccessibleErrorMessage(passwordErrorMessage);

    await step1Button.click();
    expect(emailInput).not.toHaveFocus();
    expect(emailInput).toHaveValue(emailBadResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage(emailErrorMessage);

    await submitButton.click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(emailInput).toHaveFocus();

    await emailInput.fill(emailOkResult);
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(emailInput).not.toHaveAccessibleErrorMessage();

    await step2Button.click();
    expect(passwordInput).not.toHaveFocus();
    expect(passwordInput).toHaveValue(passwordBadResult);
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAccessibleErrorMessage(passwordErrorMessage);

    await submitButton.click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(passwordInput).toHaveFocus();

    await passwordInput.fill(passwordOkResult);
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).not.toHaveAccessibleErrorMessage();

    await submitButton.click();

    expect(onSubmit).toHaveBeenCalledWith({
      email: emailOkResult,
      password: passwordOkResult
    });
  });
});
