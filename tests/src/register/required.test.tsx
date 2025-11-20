import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const submitCallback = vi.fn(() => {});
const okResult = "test";
const errorMessage = "This field is required";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("required", () => {
  it("should validate", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ register, errors }) => (
            <Input {...register("email", { required: true })} error={errors().email} />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(submitCallback).not.toHaveBeenCalled();

    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: okResult });
  });

  it("display error message", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ register, errors }) => (
            <Input {...register("email", { required: errorMessage })} error={errors().email} />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(input).toHaveAccessibleErrorMessage(errorMessage);
    expect(submitCallback).not.toHaveBeenCalled();

    await input.fill(okResult);
    expect(input).not.toHaveAccessibleErrorMessage();
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: okResult });
  });
});
