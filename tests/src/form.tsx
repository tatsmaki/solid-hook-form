import { For, JSXElement } from "solid-js";
import { CreateFormReturn, FormValues, SubmitCallback } from "../../src/types/form";
import { Path } from "../../src/types/path";
import { createForm } from "../../src/main";

type FormProps<F extends FormValues> = {
  defaultValues: F;
  fields: Record<Path<F>, (form: CreateFormReturn<F>) => JSXElement>;
  submitCallback: SubmitCallback<F>;
};

export const Form = <F extends FormValues>(props: FormProps<F>) => {
  const form = createForm({
    defaultValues: props.defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(props.submitCallback)}>
      <For each={Object.keys(props.fields)}>
        {(name) => {
          const path = name as Path<F>;
          const render = props.fields[path];

          return render(form);
        }}
      </For>

      <button type="submit">Submit</button>
    </form>
  );
};
