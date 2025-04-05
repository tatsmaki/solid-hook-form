import { createSignal } from "solid-js";
import { FieldError, FieldErrors } from "../types/errors";
import { FormValues } from "../types/form";
import { Path } from "../types/path";

export const createErrors = <F extends FormValues>() => {
  const [errors, setErrors] = createSignal<FieldErrors<F>>({});

  const appendError = (name: Path<F>, error: FieldError) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const removeError = (name: Path<F>) => {
    setErrors((prev) => {
      const errors = { ...prev };

      delete errors[name];
      return errors;
    });
  };

  const resetErrors = () => {
    setErrors({});
  };

  return {
    errors,
    appendError,
    removeError,
    resetErrors,
  };
};
