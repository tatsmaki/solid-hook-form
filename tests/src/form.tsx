import { JSXElement } from "solid-js";
import { createForm, CreateFormReturn, FormValues, SubmitHandler } from "./import";

type FormProps<F extends FormValues> = {
  mode?: "onChange" | "onSubmit" | "onBlur";
  defaultValues: F;
  render: (form: CreateFormReturn<F>) => JSXElement;
  onSubmit: SubmitHandler<F>;
  onReset?(form: CreateFormReturn<F>): void;
};

export const Form = <F extends FormValues>(props: FormProps<F>) => {
  const { mode, defaultValues } = props;

  const form = createForm({
    defaultValues,
    mode,
  });
  const { formState, values, handleSubmit } = form;

  return (
    <div>
      <form
        style={{ display: "flex", "flex-direction": "column", gap: "16px" }}
        onSubmit={handleSubmit(props.onSubmit)}
      >
        {props.render(form)}

        <button type="submit">Submit</button>

        <button type="button" onClick={() => props.onReset?.(form)}>
          Reset
        </button>
      </form>

      <br />
      <br />
      <pre aria-label="values">{JSON.stringify(values(), null, 2)}</pre>
      <br />
      <pre aria-label="touched">{JSON.stringify(formState.touchedFields(), null, 2)}</pre>
    </div>
  );
};
