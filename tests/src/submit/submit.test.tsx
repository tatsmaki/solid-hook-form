/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: aria-label */
import { render } from "vitest-browser-solid";
import { Form } from "../form";
import { Input } from "../input";

const onSubmit = vi.fn(() => {});

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
});
