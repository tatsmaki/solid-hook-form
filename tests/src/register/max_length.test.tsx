import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const maxLength = 5;
const badResult = "long-string";
const okResult = "test";
const errorMessage = "Max length is 5";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("maxLength", () => {
  it("should validate", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ register, errors }) => (
          <Input {...register("email", { maxLength })} error={errors.email} />
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

  it("display error message", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ register, errors }) => (
          <Input
            {...register("email", { maxLength: { value: maxLength, message: errorMessage } })}
            error={errors.email}
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
