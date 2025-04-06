import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { Form } from "./form";

const submitCallback = vi.fn(() => {});

const user = userEvent.setup();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("input text", () => {
  it("no validation rules", async () => {
    const { getByRole } = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: (register) => <input type="text" {...register("email")} />,
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = getByRole("textbox");
    expect(input).toHaveProperty("name", "email");

    const submit = getByRole("button", { name: "Submit" });

    await user.type(input, "test");
    await user.click(submit);
    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  it("required", async () => {
    const { getByRole, getByLabelText } = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: (register) => <input type="text" {...register("email", { required: true })} />,
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = getByRole("textbox");
    expect(input).toHaveProperty("name", "email");

    const submit = getByRole("button", { name: "Submit" });

    await user.click(submit);
    expect(submitCallback).not.toHaveBeenCalled();

    const error = getByLabelText("Error email required");
    expect(error).toBeDefined();
    expect(error).toHaveProperty("textContent", "");

    await user.type(input, "test");
    await user.click(submit);
    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  it("required message", async () => {
    const { getByRole, getByLabelText } = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: (register) => (
            <input type="text" {...register("email", { required: "Required" })} />
          ),
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = getByRole("textbox");
    expect(input).toHaveProperty("name", "email");

    const submit = getByRole("button", { name: "Submit" });

    await user.click(submit);
    expect(submitCallback).not.toHaveBeenCalled();

    const error = getByLabelText("Error email required");
    expect(error).toBeDefined();
    expect(error).toHaveProperty("textContent", "Required");

    await user.type(input, "test");
    await user.click(submit);
    expect(submitCallback).toHaveBeenCalledWith({ email: "test" });
  });

  it("minLength", async () => {
    const { getByRole, getByLabelText } = render(() => (
      <Form
        defaultValues={{
          email: "",
        }}
        fields={{
          email: (register) => <input type="text" {...register("email", { minLength: 5 })} />,
        }}
        submitCallback={submitCallback}
      />
    ));

    const input = getByRole("textbox");
    expect(input).toHaveProperty("name", "email");

    const submit = getByRole("button", { name: "Submit" });

    await user.type(input, "test");
    await user.click(submit);
    expect(submitCallback).not.toHaveBeenCalled();

    const error = getByLabelText("Error email minLength");
    expect(error).toBeDefined();
    expect(error).toHaveProperty("textContent", "");

    await user.type(input, "test");
    await user.click(submit);
    expect(submitCallback).toHaveBeenCalledWith({ email: "testtest" });
  });
});
