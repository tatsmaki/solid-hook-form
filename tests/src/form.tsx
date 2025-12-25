/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: pre aria-label */

import type { JSXElement } from "solid-js";
import { type CreateFormReturn, createForm, type FormValues, type SubmitHandler } from "./import";

type FormProps<F extends FormValues> = {
  mode?: "onChange" | "onSubmit" | "onBlur";
  defaultValues: F;
  render: (form: CreateFormReturn<F>) => JSXElement;
  submitButton?: (form: CreateFormReturn<F>) => JSXElement;
  onSubmit: SubmitHandler<F>;
  onReset?(form: CreateFormReturn<F>): void;
};

export const Form = <F extends FormValues>(props: FormProps<F>) => {
  const { mode, defaultValues } = props;

  const form = createForm({
    defaultValues,
    mode
  });
  const { formState, values, handleSubmit } = form;

  return (
    <div>
      <form
        style={{ display: "flex", "flex-direction": "column", gap: "16px" }}
        onSubmit={handleSubmit(props.onSubmit)}
      >
        {props.render(form)}

        {props.submitButton?.(form) ?? <button type="submit">Submit</button>}

        <button type="button" onClick={() => props.onReset?.(form)}>
          Reset
        </button>
      </form>

      <br />
      <br />
      <p>values</p>
      <pre aria-label="values">{JSON.stringify(values(), null, 2)}</pre>
      <br />
      <p>
        isDirty <span aria-label="isDirty">{formState.isDirty() ? "true" : "false"}</span>
      </p>

      <p>dirtyFields</p>
      <pre aria-label="dirtyFields">{JSON.stringify(formState.dirtyFields(), null, 2)}</pre>
      <br />
      <p>touchedFields</p>
      <pre aria-label="touchedFields">{JSON.stringify(formState.touchedFields(), null, 2)}</pre>
    </div>
  );
};
