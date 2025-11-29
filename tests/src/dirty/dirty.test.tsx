import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";
import { Controller } from "../import";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("dirtyFields", () => {
  it("should check dirty field", async () => {
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
    const isDirty = page.getByLabelText("isDirty");
    const dirtyFields = page.getByLabelText("dirtyFields");
    expect(input).toHaveValue("");
    expect(isDirty).toHaveTextContent("false");
    expect(dirtyFields).toHaveTextContent("{}");

    await input.fill("email");
    expect(isDirty).toHaveTextContent("true");
    expect(dirtyFields).toHaveTextContent('{ "email": true }');

    await input.fill("");
    expect(isDirty).toHaveTextContent("false");
    expect(dirtyFields).toHaveTextContent('{ "email": false }');
  });

  it("should check dirty field in nested object", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          profile: {
            name: "",
          },
        }}
        render={({ register }) => <Input {...register("profile.name")} />}
        onSubmit={onSubmit}
      />
    ));

    const input = page.getByRole("textbox", { name: "profile.name" });
    const isDirty = page.getByLabelText("isDirty");
    const dirtyFields = page.getByLabelText("dirtyFields");
    expect(input).toHaveValue("");
    expect(isDirty).toHaveTextContent("false");
    expect(dirtyFields).toHaveTextContent("{}");

    await input.fill("John Doe");
    expect(isDirty).toHaveTextContent("true");
    expect(dirtyFields).toHaveTextContent('{ "profile": { "name": true } }');

    await input.fill("");
    expect(isDirty).toHaveTextContent("false");
    expect(dirtyFields).toHaveTextContent('{ "profile": { "name": false } }');
  });

  it("should reset dirty fields", async () => {
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
    const reset = page.getByRole("button", { name: "Reset" });
    const isDirty = page.getByLabelText("isDirty");
    const dirtyFields = page.getByLabelText("dirtyFields");
    await input.fill("email");

    await reset.click();
    expect(isDirty).toHaveTextContent("false");
    expect(dirtyFields).toHaveTextContent("{}");
  });

  it("should keep dirty fields", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        render={({ register }) => <Input {...register("email")} />}
        onSubmit={onSubmit}
        onReset={({ reset }) => reset({}, { keepDirty: true })}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const reset = page.getByRole("button", { name: "Reset" });
    const isDirty = page.getByLabelText("isDirty");
    const dirtyFields = page.getByLabelText("dirtyFields");
    await input.fill("email");

    await reset.click();
    expect(isDirty).toHaveTextContent("true");
    expect(dirtyFields).toHaveTextContent('{ "email": true }');
  });
});
