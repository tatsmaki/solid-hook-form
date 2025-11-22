import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../../../src/controller";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Controller", () => {
  it("should register", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ control }) => (
          <Controller
            control={control}
            name="email"
            render={({ field }) => <Input {...field} value={field.value()} />}
          />
        )}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    expect(input).toHaveValue("");
    await input.fill("test");
    await submit.click();

    expect(onSubmit).toHaveBeenCalledWith({ email: "test" });
  });
});
