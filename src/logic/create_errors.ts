import { createStore, produce, reconcile } from "solid-js/store";
import type { FieldError, FieldErrors } from "../types/errors";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";

export const createErrors = <F extends FormValues>() => {
  const [errors, setErrors] = createStore<FieldErrors<F>>({});

  const getError = (name: Path<F>) => {
    return errors[name];
  };

  const appendError = (name: Path<F>, error: FieldError) => {
    setErrors(
      produce((prevState) => {
        prevState[name] = error;
      })
    );
  };

  const removeError = (name: Path<F>) => {
    setErrors(
      produce((prevState) => {
        delete prevState[name];
      })
    );
  };

  const resetErrors = () => {
    setErrors(reconcile({}));
  };

  return {
    errors,
    appendError,
    removeError,
    resetErrors,
    getError
  };
};
