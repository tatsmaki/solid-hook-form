import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

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
});
