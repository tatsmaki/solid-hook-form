import { For, JSXElement } from "solid-js";
import { FormValues, SubmitCallback } from "../types/form";
import { Path } from "../types/path";
import { createForm } from "../main";
import { Register } from "../types/register";

type FormProps<F extends FormValues> = {
  defaultValues: F;
  fields: Record<Path<F>, (register: Register<F>) => JSXElement>;
  submitCallback: SubmitCallback<F>;
};

export const Form = <F extends FormValues>(props: FormProps<F>) => {
  const { register, errors, handleSubmit } = createForm({
    defaultValues: props.defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(props.submitCallback)}>
      <For each={Object.keys(props.fields)}>
        {(name) => {
          const path = name as Path<F>;
          const render = props.fields[path];

          return render(register);
        }}
      </For>

      {errors() && (
        <ul aria-label="Errors">
          {Object.keys(errors()).map((key) => {
            const path = key as Path<F>;
            const type = errors()[path]?.type;
            const message = errors()[path]?.message;

            return <li aria-label={`Error ${path} ${type}`}>{message}</li>;
          })}
        </ul>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};
