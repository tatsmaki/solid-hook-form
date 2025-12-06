import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Controller } from "../import";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("reset", () => {
  it("should reset", async () => {
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

    const firstInput = page.getByRole("textbox", { name: "email" });
    const secondInput = page.getByRole("textbox", { name: "password" });
    const reset = page.getByRole("button", { name: "Reset" });

    expect(firstInput).toHaveValue("");
    expect(secondInput).toHaveValue("");

    await firstInput.fill("email");
    await secondInput.fill("password");

    await reset.click();
    expect(firstInput).toHaveValue("");
    expect(secondInput).toHaveValue("");
  });

  it("should reset but keep current values when keepValues is true", async () => {
    const emailInputValue = "example@gmail.com";
    const page = render(() => (
      <Form 
        defaultValues={{
          email: ""
        }} render={({ register }) => (
          <>
            <Input {...register("email")} />
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset, values }) => reset({ ...values() }, { keepValues: true })}
      />
    )); 
    
    const emailInput = page.getByRole("textbox", { name: "email" });
    const reset = page.getByRole("button", { name: "Reset" });

    await emailInput.fill(emailInputValue);
    await reset.click();

    expect(emailInput).toHaveValue(emailInputValue)
  })

  it("should reset and clear errors unless keepErrors is true", async () => {
    const page = render(() => (
      <Form
        defaultValues={{ email: "" }}
        render={({ register, setValue, errors }) => (
          <>
            <>
              <Input {...register("email", { required: "Email is required" })} />
              {errors?.email?.message ? (
                <p data-testid="email-error">{errors.email?.message}</p>       
              ): null}
            </>
            <button
              type="button"
              onClick={() => {
                // simulate filling invalid value
                setValue("email", "", { shouldValidate: true }); // empty triggers required
              }}
            >
            Fill Invalid
          </button>
          </>
        )}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset(undefined, { keepErrors: true })}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const resetButton = page.getByRole("button", { name: "Reset" });
    const fillInvalidBtn = page.getByRole("button", { name: "Fill Invalid" });
    const errorMessage = page.getByTestId("email-error");
  
    await fillInvalidBtn.click();

    expect(errorMessage).toHaveTextContent("Email is required");
    expect(emailInput).toHaveValue("");

    await resetButton.click();

    expect(errorMessage).toHaveTextContent("Email is required")
    expect(emailInput).toHaveValue("")
  });
});
