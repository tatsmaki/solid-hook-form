import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const pattern = /^[^@]+@[^@]+.[^@]+$/;
const minLength = 8;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("trigger", () => {
  it("should trigger form validation", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, trigger }) => (
          <>
            <Input {...register("email", { pattern })} error={errors.email} />
            <Input {...register("password", { minLength })} error={errors.password} />
            <button type="button" onClick={() => trigger()}>
              Trigger
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const trigger = page.getByRole("button", { name: "Trigger" });
    await trigger.click();

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should trigger field validation", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, trigger }) => (
          <>
            <Input {...register("email", { pattern })} error={errors.email} />
            <Input {...register("password", { minLength })} error={errors.password} />
            <button type="button" onClick={() => trigger("email")}>
              Trigger
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const trigger = page.getByRole("button", { name: "Trigger" });
    await trigger.click();

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).not.toHaveAttribute("aria-invalid", "true");
  });

  it("should trigger multiple fields validation", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, trigger }) => (
          <>
            <Input {...register("email", { pattern })} error={errors.email} />
            <Input {...register("password", { minLength })} error={errors.password} />
            <button type="button" onClick={() => trigger(["email", "password"])}>
              Trigger
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const trigger = page.getByRole("button", { name: "Trigger" });
    await trigger.click();

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });
});
