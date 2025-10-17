import { createSignal } from "solid-js";
import {
  FormValues,
  GetValues,
  OnSubmit,
  Register,
  Reset,
  SetValue,
  UseFormReturn,
} from "./types/form";
import { Path } from "./types/path";
import { FieldError } from "./types/errors";
import { getFieldValue } from "./logic/get_value";
import { setFieldValue } from "./logic/set_value";
import { validate } from "./logic/validate";
import { createErrors } from "./logic/create_errors";
import { set } from "./utils/set";
import { get } from "./utils/get";
import { createRules } from "./logic/create_rules";
import { createFields } from "./logic/create_fields";

type UseFormArg<F extends FormValues> = {
  defaultValues: F;
  mode?: "onInput" | "onChange" | "onSubmit";
};

export const useForm = <F extends FormValues>(
  arg: UseFormArg<F> = { defaultValues: {} as F }
): UseFormReturn<F> => {
  const { defaultValues, mode = "onInput" } = arg;

  const { fields, getField, setField } = createFields();
  const { rules, addRule, getRule } = createRules<F>();
  const [values, setValues] = createSignal<F>(defaultValues);
  const { errors, appendError, removeError, resetErrors, getError } = createErrors<F>();
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const setFieldError = (name: Path<F>, error: FieldError) => {
    const field = getField(name);

    if (field) {
      error.ref = field;
    }

    appendError(name, error);
  };

  const clearFieldError = (name: Path<F>) => {
    removeError(name);
  };

  const validateField = (name: Path<F>) => {
    const rule = getRule(name);
    const error = validate(values(), name, rule);

    if (error) {
      setFieldError(name, error);
    } else {
      clearFieldError(name);
    }

    setIsValid(!Object.keys(errors()).length);
  };

  const validateAllFields = () => {
    Object.keys(rules).forEach((key) => {
      validateField(key as Path<F>);
    });
  };

  const focusFirstError = () => {
    const names = Object.keys(fields) as Path<F>[];

    for (const name of names) {
      const error = getError(name);

      if (error) {
        error.ref?.focus();
        break;
      }
    }
  };

  const onFieldChange = (event: Event, name: Path<F>) => {
    const value = getFieldValue(event);

    setValues((prev) => {
      const newState = { ...prev };

      set(newState, name, value);

      return newState;
    });
    validateField(name);
  };

  const register: Register<F> = (name, options = {}) => {
    addRule(name, options);

    return {
      name,
      // value: get(values(), name),
      onInput(event) {
        if (mode === "onInput") {
          onFieldChange(event, name);
        }
      },
      onChange(event) {
        if (mode === "onChange" || mode === "onInput") {
          onFieldChange(event, name);
        }
      },
      ref(element) {
        const field = getField(name);

        if (field) {
          return;
        }

        setField(name, element);

        if (element) {
          setFieldValue(element, get(values(), name));
        }
      },
    };
  };

  const getValues: GetValues<F> = (name?: Path<F>) => {
    if (name) {
      return get(values(), name);
    }

    return values();
  };

  const setValue: SetValue<F> = (name, value) => {
    setValues((prev) => {
      const newValues = { ...prev };

      set(newValues, name, value);

      return newValues;
    });

    const field = getField(name);

    if (field) {
      setFieldValue(field, value);
    }
  };

  const onSubmit: OnSubmit<F> = (submit) => {
    return (event) => {
      event.preventDefault();
      validateAllFields();

      if (isValid()) {
        submit(getValues());
      }

      focusFirstError();
    };
  };

  const reset: Reset<F> = (newDefaultValues = {}) => {
    const newValues = {
      ...structuredClone(defaultValues),
      ...newDefaultValues,
    };

    setValues(() => newValues);
    resetErrors();
    setIsValid(true);

    Object.entries(fields).forEach(([name, field]) => {
      if (field) {
        setFieldValue(field, get(newValues, name));
      }
    });
  };

  return {
    values,
    errors,
    isValid,
    register,
    getValues,
    setValue,
    onSubmit,
    reset,
  };
};
