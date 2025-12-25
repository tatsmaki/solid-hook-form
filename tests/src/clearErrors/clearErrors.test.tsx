import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("clearErrors", () => {
  it("should clear all errors", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, clearErrors }) => (
          <>
            <Input {...register("email", { required: true })} error={errors.email} />
            <Input {...register("password", { required: true })} error={errors.password} />
            <button type="button" onClick={() => clearErrors()}>
              clearErrors
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    const clearErrors = page.getByRole("button", { name: "clearErrors" });

    await submitButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await clearErrors.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
  });

  it("should clear field error", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, clearErrors }) => (
          <>
            <Input {...register("email", { required: true })} error={errors.email} />
            <Input {...register("password", { required: true })} error={errors.password} />
            <button type="button" onClick={() => clearErrors("email")}>
              clearErrors
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    const clearErrors = page.getByRole("button", { name: "clearErrors" });

    await submitButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await clearErrors.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should clear multiple field errors", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ errors, register, clearErrors }) => (
          <>
            <Input {...register("email", { required: true })} error={errors.email} />
            <Input {...register("password", { required: true })} error={errors.password} />
            <button type="button" onClick={() => clearErrors(["email", "password"])}>
              clearErrors
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const submitButton = page.getByRole("button", { name: "Submit" });
    const clearErrors = page.getByRole("button", { name: "clearErrors" });

    await submitButton.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await clearErrors.click();
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
    expect(passwordInput).toHaveAttribute("aria-invalid", "false");
  });
});
