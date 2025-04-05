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
import { FieldErrors } from "./types/errors";
import { InputEvent, ChangeEvent } from "./types/event";
import { executeGetValueStrategy } from "./logic/get_value";
import { executeSetValueStrategy } from "./logic/set_value";
import { Rules } from "./types/validate";
import { validate } from "./logic/validate";

type FormFields = Record<string, HTMLInputElement | null>;

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
  const [errors, setErrors] = createSignal<FieldErrors<F>>({});
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const validateField = (name: Path<F>) => {
    // const field = fields[name];
    const rule = rules[name];

    // const value = field && executeGetValueStrategy(field);

    const error = validate(values(), name, rule);

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const errors = { ...prev };

        delete errors[name];
        return errors;
      });
    }

    setIsValid(!Object.keys(errors()).length);
  };

  const validateAllFields = () => {
    Object.keys(values()).forEach((key) => {
      validateField(key as Path<F>);
    });
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
          const newValue = event.target.value;

          setValues((prev) => ({ ...prev, [name]: newValue }));
          validateField(name);
        }
      },
      onChange(event) {
        if (mode === "onChange" || mode === "onInput") {
          const value = executeGetValueStrategy(event.target);

          setValues((prev) => ({ ...prev, [name]: value }));
          validateField(name);
        }
      },
      ref(element) {
        const field = fields[name];

        if (field) {
          return;
        }

        fields[name] = element;

        if (element) {
          executeSetValueStrategy(element, values()[name]);
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
      executeSetValueStrategy(field, value);
    }
  };

  const onSubmit: OnSubmit<F> = (submit) => {
    return (event) => {
      event.preventDefault();
      validateAllFields();

      if (isValid()) {
        submit(getValues());
      }
    };
  };

  const reset: Reset<F> = (newDefaultValues = {}) => {
    setValues(() => ({
      ...defaultValues,
      ...newDefaultValues,
    }));
    setErrors({});
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
