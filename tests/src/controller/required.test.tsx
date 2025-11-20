import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../../../src/controller";

const submitCallback = vi.fn(() => {});
const okResult = "test";
const errorMessage = "This field is required";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Controller", () => {
  it("validate required", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ control }) => (
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => <Input {...field} error={fieldState.error()} />}
              rules={{ required: true }}
            />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(submitCallback).not.toHaveBeenCalled();

    expect(input).toHaveAttribute("aria-invalid", "true");

    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: okResult });
  });

  it("display required message", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ control }) => (
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => <Input {...field} error={fieldState.error()} />}
              rules={{ required: errorMessage }}
            />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(submitCallback).not.toHaveBeenCalled();
    expect(input).toHaveAccessibleErrorMessage(errorMessage);

    await input.fill(okResult);
    expect(input).not.toHaveAccessibleErrorMessage();
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: okResult });
  });
});
