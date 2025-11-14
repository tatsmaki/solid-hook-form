import { createMemo, createSignal } from "solid-js";
import type { Resolver } from "react-hook-form";
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
import { formatValue } from "./logic/format_value";
import { getResolverFields } from "./utils/resolver";
import { Control } from "./types/control";

type UseFormArg<F extends FormValues> = {
  defaultValues: F;
  mode?: "onChange" | "onSubmit";
  resolver?: Resolver<F>;
};

export const useForm = <F extends FormValues>(
  arg: UseFormArg<F> = { defaultValues: {} as F }
): UseFormReturn<F> => {
  const { defaultValues, mode = "onInput", resolver } = arg;

  const { fields, getField, setField } = createFields();
  const { rules, addRule, getRule } = createRules<F>();
  const [values, setValues] = createSignal<F>(defaultValues);
  const { errors, appendError, removeError, resetErrors, getError } = createErrors<F>();

  const isValid = createMemo(() => {
    return !Object.keys(errors()).length;
  });

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

  const runSchema = async (names: Path<F>[]) => {
    if (!resolver) {
      return;
    }

    const result = await resolver(values(), null, {
      fields: getResolverFields(fields),
      shouldUseNativeValidation: false,
    });

    for (const name of names) {
      const error = get(result.errors, name);

      if (error) {
        setFieldError(name, error);
      } else {
        clearFieldError(name);
      }
    }
  };

  const validateField = (name: Path<F>) => {
    if (resolver) {
      runSchema([name]);

      return;
    }

    const rule = getRule(name);
    const error = validate(values(), name, rule);

    if (error) {
      setFieldError(name, error);
    } else {
      clearFieldError(name);
    }
  };

  const validateAllFields = async () => {
    if (resolver) {
      await runSchema(Object.keys(fields) as any);

      return;
    }

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
    const value = formatValue(getFieldValue(event), rules[name]);

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
      onInput(event) {
        if (mode === "onChange") {
          onFieldChange(event, name);
        }
      },
      onChange(event) {
        if (mode === "onChange") {
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

  const control: Control<F> = {
    values,
    errors,
    register,
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
    return async (event) => {
      event.preventDefault();
      await validateAllFields();

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

    Object.entries(fields).forEach(([name, field]) => {
      if (field) {
        setFieldValue(field, get(newValues, name));
      }
    });
  };

  return {
    control,
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
