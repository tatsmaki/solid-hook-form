import { createSignal } from "solid-js";
import {
  FormFields,
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
import { Rules } from "./types/validate";
import { validate } from "./logic/validate";
import { createErrors } from "./logic/create_errors";

type UseFormArg<T extends FormValues> = {
  defaultValues: T;
  mode?: "onInput" | "onChange" | "onSubmit";
};

export const useForm = <F extends FormValues>({
  defaultValues,
  mode = "onInput",
}: UseFormArg<F>): UseFormReturn<F> => {
  const fields: FormFields = {};
  const rules: Record<string, Rules<F, Path<F>>> = {};

  const [values, setValues] = createSignal<F>(defaultValues);
  const { errors, appendError, removeError, resetErrors } = createErrors<F>();
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const setFieldError = (name: Path<F>, error: FieldError) => {
    const field = fields[name];

    if (field) {
      error.ref = field;
    }

    appendError(name, error);
  };

  const clearFieldError = (name: Path<F>) => {
    removeError(name);
  };

  const validateField = (name: Path<F>) => {
    const rule = rules[name];
    const error = validate(values(), name, rule);

    if (error) {
      setFieldError(name, error);
    } else {
      clearFieldError(name);
    }

    setIsValid(!Object.keys(errors()).length);
  };

  const validateAllFields = () => {
    Object.keys(values()).forEach((key) => {
      validateField(key as Path<F>);
    });
  };

  const onFieldChange = (event: Event, name: Path<F>) => {
    const value = getFieldValue(event);

    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name);
  };

  const register: Register<F> = (name, options = {}) => {
    rules[name] = {
      required: options.required,
      min: options.min,
      max: options.max,
      minLength: options.minLength,
      maxLength: options.maxLength,
      pattern: options.pattern,
      validate: options.validate,
    };

    return {
      name,
      // value: values()[name],
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
        const field = fields[name];

        if (field) {
          return;
        }

        fields[name] = element;

        if (element) {
          setFieldValue(element, values()[name]);
        }
      },
    };
  };

  const getValues: GetValues<F> = (name?: string) => {
    if (name) {
      return values()[name];
    }

    return values();
  };

  const setValue: SetValue<F> = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    const field = fields[name];

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

      (Object.values(errors()) as FieldError[])[0]?.ref?.focus();
    };
  };

  const reset: Reset<F> = (newDefaultValues = {}) => {
    setValues(() => ({
      ...defaultValues,
      ...newDefaultValues,
    }));
    resetErrors();
    setIsValid(true);
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
