import { createSignal } from "solid-js";
import { FormValues } from "./types/form";
import { Path } from "./types/path";
import { FieldError, FieldErrors } from "./types/errors";

type FormFields = Record<string, HTMLInputElement | null>;

type UseFormArg<T extends FormValues> = {
  defaultValues: T;
  mode?: "onInput" | "onChange" | "onSubmit";
};

type SubmitCallback<T extends FormValues> = (values: T) => void;

type Rules = {
  required: boolean;
};

export const useForm = <T extends FormValues>({
  defaultValues,
  mode = "onInput",
}: UseFormArg<T>) => {
  const values: FormValues = defaultValues;
  const fields: FormFields = {};
  const rules: Record<string, Rules> = {};

  const [errors, setErrors] = createSignal<FieldErrors<T>>({});
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const validateField = (name: Path<T>) => {
    const field = fields[name];
    const rule = rules[name];

    if (rule?.required && !field?.value) {
      setErrors((prev) => {
        const newError: FieldError = { message: "Required" };

        return { ...prev, [name]: newError };
      });
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
    Object.keys(values).forEach((key) => {
      validateField(key as Path<T>);
    });
  };

  const register = (name: Path<T>, options?: Rules) => {
    if (options) {
      rules[name] = { required: options.required };
    }

    return {
      name,
      value: values[name],
      onInput(event: InputEvent) {
        if (mode === "onInput") {
          const newValue = (event.target as HTMLInputElement).value;

          values[name] = newValue;
          validateField(name);
        }
      },
      onChange(event: Event) {
        if (mode === "onChange") {
          const newValue = (event.target as HTMLInputElement).value;

          values[name] = newValue;
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
          ref.value = values[name];
        }
      },
    };
  };

  const getValues = (name?: Path<T>) => {
    if (name) {
      return values[name];
    }

    return values;
  };

  const setValue = (name: Path<T>, value: any) => {
    values[name] = value;

    const field = fields[name];

    if (field) {
      field.value = value;
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
    Object.assign(values, newDefaultValues || defaultValues);
    setErrors({});
    setIsValid(true);
  };

  return {
    errors,
    isValid,
    register,
    getValues,
    setValue,
    onSubmit,
    reset,
  };
};
