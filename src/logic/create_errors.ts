import { createSignal } from "solid-js";
import { FieldError, FieldErrors } from "../types/errors";
import { FormValues } from "../types/form";
import { Path } from "../types/path";
import { get } from "../utils/get";

export const createErrors = <F extends FormValues>() => {
  const [errors, setErrors] = createSignal<FieldErrors<F>>({});

  const getError = (name: string) => {
    return get(errors(), name);
  };

  const appendError = (name: Path<F>, error: FieldError) => {
    setErrors((prev) => {
      const newState = { ...prev, [name]: error };

      return newState;
    });
  };

  const removeError = (name: Path<F>) => {
    setErrors((prev) => {
      const newState = { ...prev };

      delete newState[name];

      return newState;
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
    getError,
  };
};
