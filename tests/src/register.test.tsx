import { render } from "vitest-browser-solid";
import { Form } from "./form";
import { Input } from "./input";

const submitCallback = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("register", () => {
  it("should register", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ register }) => <Input {...register("email")} />,
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await input.fill("test");
    await submit.click();

    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  it("validate required", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ register, errors }) => (
            <Input {...register("email", { required: true })} error={errors().email} />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(submitCallback).not.toHaveBeenCalled();

    expect(input).toHaveAttribute("aria-invalid", "true");

    await input.fill("test");
    expect(input).toHaveAttribute("aria-invalid", "false");
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  it("display required message", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: ({ register, errors }) => (
            <Input {...register("email", { required: "Required" })} error={errors().email} />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = page.getByRole("textbox", { name: "email" });
    const submit = page.getByRole("button", { name: "Submit" });
    await submit.click();
    expect(submitCallback).not.toHaveBeenCalled();
    expect(input).toHaveAccessibleErrorMessage("Required");

    await input.fill("test");
    expect(input).not.toHaveAccessibleErrorMessage();
    await submit.click();
    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  // it("minLength", async () => {
  //   const { getByRole, getByLabelText } = render(() => (
  //     <Form
  //       defaultValues={{
  //         email: "",
  //       }}
  //       fields={{
  //         email: (register) => <input type="text" {...register("email", { minLength: 5 })} />,
  //       }}
  //       submitCallback={submitCallback}
  //     />
  //   ));

  //   const input = getByRole("textbox");
  //   expect(input).toHaveProperty("name", "email");

  //   const submit = getByRole("button", { name: "Submit" });

  //   await user.type(input, "test");
  //   await user.click(submit);
  //   expect(submitCallback).not.toHaveBeenCalled();

  //   const error = getByLabelText("Error email minLength");
  //   expect(error).toBeDefined();
  //   expect(error).toHaveProperty("textContent", "");

  //   await user.type(input, "test");
  //   await user.click(submit);
  //   expect(submitCallback).toHaveBeenCalledWith({ email: "testtest" });
  // });
});
