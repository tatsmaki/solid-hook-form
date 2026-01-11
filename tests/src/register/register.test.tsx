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
    const pattern = /^[^@]+@[^@]+.[^@]+$/;
    const emailOkResult = "email@example.com";
    const emailErrorMessage = "Invalid email";
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
          render={({ errors, formState, register, trigger }) => (
            <>
              <Show when={formStep() === 0}>
                <Input
                  {...register("email", {
                    pattern: { value: pattern, message: emailErrorMessage }
                  })}
                  error={errors.email}
                />
                <button
                  type="button"
                  onClick={() => {
                    trigger();

                    if (formState.isValid()) {
                      setFormStep(1);
                    }
                  }}
                >
                  Next
                </button>
              </Show>
              <Show when={formStep() === 1}>
                <Input
                  {...register("password", {
                    minLength: { value: minLength, message: passwordErrorMessage }
                  })}
                  error={errors.password}
                />
                <button type="button" onClick={() => setFormStep(0)}>
                  Back
                </button>
              </Show>
            </>
          )}
          onSubmit={onSubmit}
        />
      );
    });

    const emailInput = page.getByRole("textbox", { name: "email" });
    const nextButton = page.getByRole("button", { name: "Next" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(emailInput).toHaveValue("");

    await submitButton.click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(emailInput).toHaveFocus();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleErrorMessage(emailErrorMessage);
    await emailInput.fill(emailOkResult);
    await nextButton.click();

    const passwordInput = page.getByRole("textbox", { name: "password" });
    const backButton = page.getByRole("button", { name: "Back" });
    expect(passwordInput).toHaveValue("");

    await submitButton.click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(passwordInput).toHaveFocus();
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAccessibleErrorMessage(passwordErrorMessage);
    await passwordInput.fill(passwordOkResult);
    await backButton.click();

    expect(emailInput).toHaveValue(emailOkResult);
    await nextButton.click();

    expect(passwordInput).toHaveValue(passwordOkResult);
    await submitButton.click();

    expect(onSubmit).toHaveBeenCalledWith({
      email: emailOkResult,
      password: passwordOkResult
    });
  });
});
