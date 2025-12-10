import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Controller } from "../import";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("reset", () => {
  it("should reset values", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ control, register }) => (
          <>
            <Input {...register("email")} />
            <Controller
              control={control}
              name="password"
              render={({ field }) => <Input {...field} value={field.value()} />}
            />
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset()}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const resetButton = page.getByRole("button", { name: "Reset" });

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    await emailInput.fill("email");
    await passwordInput.fill("password");
    await resetButton.click();
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

  it("should reset errors", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ control, errors, register }) => (
          <>
            <Input {...register("email", { minLength: 10 })} error={errors.email} />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input {...field} value={field.value()} error={errors.password} />
              )}
              rules={{
                minLength: 10
              }}
            />
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset()}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const resetButton = page.getByRole("button", { name: "Reset" });

    await emailInput.fill("email");
    await passwordInput.fill("password");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await resetButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
  });

  it("should keep values", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ control, register }) => (
          <>
            <Input {...register("email")} />
            <Controller
              control={control}
              name="password"
              render={({ field }) => <Input {...field} value={field.value()} />}
            />
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset(undefined, { keepValues: true })}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const resetButton = page.getByRole("button", { name: "Reset" });

    const emailValue = "example@gmail.com";
    const passwordValue = "secret";
    await emailInput.fill(emailValue);
    await passwordInput.fill(passwordValue);
    await resetButton.click();
    expect(emailInput).toHaveValue(emailValue);
    expect(passwordInput).toHaveValue(passwordValue);
  });

  it("should keep errors", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ control, errors, register }) => (
          <>
            <Input {...register("email", { required: true })} error={errors.email} />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input {...field} value={field.value()} error={errors.password} />
              )}
              rules={{ required: true }}
            />
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset(undefined, { keepErrors: true })}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const resetButton = page.getByRole("button", { name: "Reset" });

    await emailInput.fill("email");
    await emailInput.fill("");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");

    await passwordInput.fill("password");
    await passwordInput.fill("");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await resetButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });
});
