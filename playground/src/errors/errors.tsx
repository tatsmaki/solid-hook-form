import { type FieldErrors, useFormContext } from "../import";
import type { FormValues } from "../schema";
import sx from "./errors.module.css";

export const Errors = () => {
  const { errors } = useFormContext<FormValues>();
  // const [_errors, _setErrors] = createSignal<FieldErrors>({});

  // createEffect(() => {
  //   const signal = errors();

  //   document.startViewTransition(() => {
  //     _setErrors(signal);
  //   });
  // });

  const removeRef = (errors: FieldErrors) =>
    Object.fromEntries(
      Object.entries(errors).map(([key, error]) => [
        key,
        error ? { ...error, ref: undefined } : error
      ])
    );

  return (
    <div class={sx.errors}>
      <h2>Errors</h2>
      <pre>{JSON.stringify(removeRef(errors), null, 2)}</pre>
    </div>
  );
};
