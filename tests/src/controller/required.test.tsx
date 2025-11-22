import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../../../src/controller";

const onSubmit = vi.fn(() => {});
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
        render={({ control }) => (
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input {...field} value={field.value()} error={fieldState.error()} />
            )}
            rules={{ required: true }}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await submit.click();
    expect(onSubmit).not.toHaveBeenCalled();

    expect(input).toHaveAttribute("aria-invalid", "true");

    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
    await submit.click();
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult });
  });

  it("display required message", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ control }) => (
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input {...field} value={field.value()} error={fieldState.error()} />
            )}
            rules={{ required: errorMessage }}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await submit.click();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveAccessibleErrorMessage(errorMessage);

    await input.fill(okResult);
    expect(input).not.toHaveAccessibleErrorMessage();
    await submit.click();
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult });
  });
});
