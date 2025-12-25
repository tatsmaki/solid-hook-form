import { createStore, produce, reconcile } from "solid-js/store";
import type { ClearErrors, FieldError, FieldErrors } from "../types/errors";
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

  const clearError = (name: Path<F>) => {
    setErrors(
      produce((prevState) => {
        delete prevState[name];
      })
    );
  };

  const resetErrors = (keepErrors?: boolean) => {
    if (keepErrors) {
      return;
    }

    setErrors(reconcile({}));
  };

  const clearErrors: ClearErrors<F> = (name) => {
    if (!name) {
      resetErrors();
      return;
    }

    if (typeof name === "string") {
      clearError(name);
      return;
    }

    setErrors(
      produce((prevState) => {
        name.forEach((name) => {
          delete prevState[name];
        });
      })
    );
  };

  return {
    errors,
    appendError,
    clearError,
    resetErrors,
    getError,
    clearErrors
  };
};
