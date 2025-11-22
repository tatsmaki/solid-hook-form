import { JSXElement } from "solid-js";
import { createForm, CreateFormReturn, FormValues, SubmitCallback } from "./import";

type FormProps<F extends FormValues> = {
  mode?: "onChange" | "onSubmit" | "onBlur";
  defaultValues: F;
  render: (form: CreateFormReturn<F>) => JSXElement;
  onSubmit: SubmitCallback<F>;
  onReset?(form: CreateFormReturn<F>): void;
};

export const Form = <F extends FormValues>(props: FormProps<F>) => {
  const { mode, defaultValues } = props;

  const form = createForm({
    defaultValues,
    mode,
  });
  const { formState, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      {props.render(form)}

      <button type="submit">Submit</button>

      <button type="button" onClick={() => props.onReset?.(form)}>
        Reset
      </button>

      <pre aria-label="touched">{JSON.stringify(formState.touchedFields(), null, 2)}</pre>
    </form>
  );
};
