import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const badResult = "email";
const pattern = /^[^@]+@[^@]+.[^@]+$/;
const okResult = "email@example.com";
const errorMessage = "Invalid email";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("pattern", () => {
  it("should validate", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ register, errors }) => (
          <Input {...register("email", { pattern })} error={errors().email} />
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
          email: "",
        }}
        render={({ register, errors }) => (
          <Input
            {...register("email", {
              pattern: { value: pattern, message: errorMessage },
            })}
            error={errors().email}
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
