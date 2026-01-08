import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const errorMessage = "This field is required";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("onSubmit mode", () => {
  it("should NOT validate on input/change/blur, only on submit", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        mode="onSubmit"
        render={({ register, errors }) => (
          <Input {...register("email", { required: errorMessage })} error={errors.email} />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    // Input event should NOT trigger validation
    await input.fill("test");
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();
    await input.fill("");

    // Blur should NOT trigger validation
    await input.click();
    await userEvent.tab();
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).not.toHaveAccessibleErrorMessage();

    // Submit should trigger validation
    await submitButton.click();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleErrorMessage(errorMessage);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
