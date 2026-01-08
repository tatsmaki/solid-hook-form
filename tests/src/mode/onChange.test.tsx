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

describe("onChange mode", () => {
  it("should validate on every input/change event", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        mode="onChange"
        render={({ register, errors }) => (
          <Input
            {...register("email", { minLength: { value: minLength, message: errorMessage } })}
            error={errors.email}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    // Blur event should NOT trigger validation
    await input.click();
    await userEvent.tab();
    expect(input).toHaveAttribute("aria-invalid", "false");

    // Input event should trigger validation
    await input.fill(badResult);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleErrorMessage(errorMessage);

    // Input event should re-validate
    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("should validate on submit event", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        mode="onChange"
        render={({ register, errors }) => (
          <Input
            {...register("email", { minLength: { value: minLength, message: errorMessage } })}
            error={errors.email}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    // Submit event should trigger validation
    await submitButton.click();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleErrorMessage(errorMessage);
    expect(onSubmit).not.toHaveBeenCalled();

    // Input event should re-validate
    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    // Submit should succeed with valid value
    await submitButton.click();
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult });
  });
});
