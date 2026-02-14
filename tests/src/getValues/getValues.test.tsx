import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const onGetValue = vi.fn();
const onGetAllValues = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getValues", () => {
  it("should get single field value by name", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ getValues, register }) => (
          <>
            <Input {...register("email")} />
            <Input {...register("password")} />
            <button type="button" onClick={() => onGetValue(getValues("email"))}>
              Get email value
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const getButton = page.getByRole("button", { name: "Get email value" });

    await getButton.click();
    expect(onGetValue).toHaveBeenCalledWith("");

    await emailInput.fill("user@example.com");
    await getButton.click();
    expect(onGetValue).toHaveBeenCalledWith("user@example.com");

    await emailInput.fill("123");
    await getButton.click();
    expect(onGetValue).toHaveBeenCalledWith("123");
  });

  it("should get all fields values", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
          password: ""
        }}
        render={({ getValues, register }) => (
          <>
            <Input {...register("email")} />
            <Input {...register("password")} />
            <button type="button" onClick={() => onGetAllValues(getValues())}>
              Get all values
            </button>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const emailInput = page.getByRole("textbox", { name: "email" });
    const passwordInput = page.getByRole("textbox", { name: "password" });
    const getButton = page.getByRole("button", { name: "Get all values" });

    await getButton.click();
    expect(onGetAllValues).toHaveBeenCalledWith({ email: "", password: "" });

    await emailInput.fill("user@example.com");
    await getButton.click();
    expect(onGetAllValues).toHaveBeenCalledWith({
      email: "user@example.com",
      password: ""
    });

    await passwordInput.fill("secret");
    await getButton.click();
    expect(onGetAllValues).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret"
    });
  });
});
