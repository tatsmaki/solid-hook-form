import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../import";

const onSubmit = vi.fn(() => {});
const minLength = 5;
const badResult = "test";
const okResult = "long-string";
const errorMessage = "Min length is 5";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Controller", () => {
  it("validate minLength", async () => {
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
            rules={{ minLength }}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await input.fill(badResult);
    await submit.click();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(onSubmit).not.toHaveBeenCalled();

    await input.fill(okResult);
    expect(input).toHaveAttribute("aria-invalid", "false");
    await submit.click();
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult });
  });

  it("display minLength message", async () => {
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
            rules={{ minLength: { value: minLength, message: errorMessage } }}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await input.fill(badResult);
    await submit.click();
    expect(input).toHaveAccessibleErrorMessage(errorMessage);
    expect(onSubmit).not.toHaveBeenCalled();

    await input.fill(okResult);
    expect(input).not.toHaveAccessibleErrorMessage();
    await submit.click();
    expect(onSubmit).toHaveBeenCalledWith({ email: okResult });
  });
});
