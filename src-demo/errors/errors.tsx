import { FieldErrors } from "../../src/main";
import { useFormContext } from "../../src/use_form_context";
import { DemoFormValues } from "../form";
import sx from "./errors.module.css";

export const Errors = () => {
  const { errors } = useFormContext<DemoFormValues>();
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
        error ? { ...error, ref: undefined } : error,
      ])
    );

  return (
    <div class={sx.errors}>
      <h2>Errors</h2>
      <pre>{JSON.stringify(removeRef(errors()), null, 2)}</pre>
    </div>
  );
};
