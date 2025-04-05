import { createSignal } from "solid-js";
import { FormValues } from "./types/form";
import { Path } from "./types/path";
import { FieldErrors } from "./types/errors";
import { ChangeEvent } from "./types/event";
import { executeGetValueStrategy } from "./logic/get_value";
import { executeSetValueStrategy } from "./logic/set_value";
import { Rules } from "./types/validate";
import { validate } from "./logic/validate";

type FormFields = Record<string, HTMLInputElement | null>;

type UseFormArg<T extends FormValues> = {
  defaultValues: T;
  mode?: "onInput" | "onChange" | "onSubmit";
};

type SubmitCallback<T extends FormValues> = (values: T) => void;

export const useForm = <T extends FormValues>({
  defaultValues,
  mode = "onInput",
}: UseFormArg<T>) => {
  const fields: FormFields = {};
  const rules: Record<string, Rules<T, Path<T>>> = {};

  const [values, setValues] = createSignal<T>(defaultValues);
  const [errors, setErrors] = createSignal<FieldErrors<T>>({});
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const validateField = (name: Path<T>) => {
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
      validateField(key as Path<T>);
    });
  };

  const register = (name: Path<T>, options?: Rules<T, Path<T>>) => {
    if (options) {
      rules[name] = {
        required: options.required,
        min: options.min,
        max: options.max,
        minLength: options.minLength,
        maxLength: options.maxLength,
        pattern: options.pattern,
        validate: options.validate,
      };
    }

    return {
      name,
      // value: values()[name],
      onInput(event: InputEvent) {
        if (mode === "onInput") {
          const newValue = (event.target as HTMLInputElement).value;

          setValues((prev) => ({ ...prev, [name]: newValue }));
          validateField(name);
        }
      },
      onChange(event: ChangeEvent) {
        if (mode === "onChange" || mode === "onInput") {
          const value = executeGetValueStrategy(event.target);

          setValues((prev) => ({ ...prev, [name]: value }));
          validateField(name);
        }
      },
      ref: (ref: HTMLInputElement | null) => {
        const field = fields[name];

        if (field) {
          return;
        }

        fields[name] = ref;

        if (ref) {
          executeSetValueStrategy(ref, values()[name]);
        }
      },
    };
  };

  const getValues = (name?: Path<T>) => {
    if (name) {
      return values()[name];
    }

    return values();
  };

  const setValue = (name: Path<T>, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    const field = fields[name];

    if (field) {
      executeSetValueStrategy(field, value);
    }
  };

  const onSubmit = (submit: SubmitCallback<T>) => {
    return (event: SubmitEvent) => {
      event.preventDefault();
      validateAllFields();

      if (isValid()) {
        submit(getValues());
      }
    };
  };

  const reset = (newDefaultValues?: Partial<T>) => {
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
