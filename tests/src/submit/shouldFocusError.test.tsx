import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("shouldFocusError", () => {
  it("should focus first error", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          firstName: "",
          lastName: ""
        }}
        render={({ register }) => (
          <>
            <Input {...register("firstName", { required: true })} />
            <Input {...register("lastName", { required: true })} />
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const submitButton = page.getByRole("button", { name: "Submit" });
    const firstNameInput = page.getByRole("textbox", { name: "firstName" });
    const lastNameInput = page.getByRole("textbox", { name: "lastName" });
    expect(firstNameInput).not.toHaveFocus();
    expect(lastNameInput).not.toHaveFocus();
    await submitButton.click();

    expect(firstNameInput).toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should not focus error", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          firstName: "",
          lastName: ""
        }}
        shouldFocusError={false}
        render={({ register }) => (
          <>
            <Input {...register("firstName", { required: true })} />
            <Input {...register("lastName", { required: true })} />
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const submitButton = page.getByRole("button", { name: "Submit" });
    const firstNameInput = page.getByRole("textbox", { name: "firstName" });
    const lastNameInput = page.getByRole("textbox", { name: "lastName" });
    expect(firstNameInput).not.toHaveFocus();
    expect(lastNameInput).not.toHaveFocus();
    await submitButton.click();

    expect(firstNameInput).not.toHaveFocus();
    expect(lastNameInput).not.toHaveFocus();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
