/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: aria-label */
import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});
const onError = vi.fn(() => {});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("submit", () => {
  it("should set isSubmitted", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ formState, register }) => (
          <>
            <Input {...register("email")} />
            <span aria-label="isSubmitted">{String(formState.isSubmitted())}</span>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const submitButton = page.getByRole("button", { name: "Submit" });
    const isSubmitted = page.getByLabelText("isSubmitted");
    expect(isSubmitted).toHaveTextContent("false");

    await submitButton.click();
    expect(onSubmit).toHaveBeenCalled();
    expect(isSubmitted).toHaveTextContent("true");
  });

  it("should increase submitCount", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ formState, register }) => (
          <>
            <Input {...register("email")} />
            <span aria-label="submitCount">{formState.submitCount()}</span>
          </>
        )}
        onSubmit={onSubmit}
      />
    ));

    const submitButton = page.getByRole("button", { name: "Submit" });
    const submitCount = page.getByLabelText("submitCount");
    expect(submitCount).toHaveTextContent("0");

    await submitButton.click();
    expect(onSubmit).toHaveBeenCalled();
    expect(submitCount).toHaveTextContent("1");

    await submitButton.click();
    expect(onSubmit).toHaveBeenCalled();
    expect(submitCount).toHaveTextContent("2");
  });

  it("should call onError", async () => {
    const page = render(() => (
      <Form
        defaultValues={{
          email: ""
        }}
        render={({ register }) => (
          <Input {...register("email", { required: "Email is required" })} />
        )}
        onSubmit={onSubmit}
        onError={onError}
      />
    ));

    const submitButton = page.getByRole("button", { name: "Submit" });
    await submitButton.click();

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        email: expect.objectContaining({ message: "Email is required" })
      })
    );
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
