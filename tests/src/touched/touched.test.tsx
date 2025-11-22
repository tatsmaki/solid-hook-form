import { render } from "vitest-browser-solid";
import { userEvent } from "vitest/browser";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("touchedFields", () => {
  it("should add touched field", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ register }) => <Input {...register("email")} />}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const touched = page.getByLabelText("touched");
    await input.click();
    expect(input).toHaveFocus();
    expect(touched).toHaveTextContent("{}");

    await userEvent.tab();
    expect(input).not.toHaveFocus();
    expect(touched).toHaveTextContent('{ "email": true }');
  });

  it("should reset touched fields", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ register }) => <Input {...register("email")} />}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset()}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const touched = page.getByLabelText("touched");
    const reset = page.getByRole("button", { name: "Reset" });
    await input.click();
    await userEvent.tab();
    expect(touched).toHaveTextContent('{ "email": true }');

    await reset.click();
    expect(touched).toHaveTextContent("{}");
  });

  it("should keep touched fields", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ register }) => <Input {...register("email")} />}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset({}, { keepTouched: true })}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const touched = page.getByLabelText("touched");
    const reset = page.getByRole("button", { name: "Reset" });
    await input.click();
    await userEvent.tab();
    expect(touched).toHaveTextContent('{ "email": true }');

    await reset.click();
    expect(touched).toHaveTextContent('{ "email": true }');
  });
});
