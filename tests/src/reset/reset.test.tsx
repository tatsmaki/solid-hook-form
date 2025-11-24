import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../import";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("reset", () => {
  it("should reset", async () => {
    const page = render(() => (
      <Form<any>
        defaultValues={{
          email: "",
          password: "",
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
});
