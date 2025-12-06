import { createMemo, createSignal } from "solid-js";
import {
  CreateForm,
  CreateFormArg,
  CreateFormReturn,
  FormValues,
  GetValues,
  HandleSubmit,
  Reset,
  SetValue,
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
import { Control } from "./types/controller";
import { Register } from "./types/register";
import { createTouchedFields } from "./logic/create_touched_fields";
import { createDirtyFields } from "./logic/create_dirty_fields";

export const createForm: CreateForm = <F extends FormValues>(
  arg: CreateFormArg<F>
): CreateFormReturn<F> => {
  const { defaultValues, mode = "onChange", resolver } = arg;

  const { fields, getField, setField } = createFields();
  const { rules, addRule, getRule } = createRules<F>();
  const [values, setValues] = createSignal<F>(structuredClone(defaultValues));
  const { errors, appendError, removeError, resetErrors, getError } = createErrors<F>();
  const { touchedFields, addTouched, resetTouched } = createTouchedFields<F>();
  const { dirtyFields, isDirty, checkDirty, resetDirty } = createDirtyFields<F>(defaultValues);

  const isValid = createMemo(() => {
    return !Object.keys(errors).length;
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

    const result = await resolver(values() || {}, null, {
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

  const onFieldChange = (event: Event | unknown, name: Path<F>) => {
    const fieldValue = getFieldValue(event);
    const value = formatValue(fieldValue, rules[name]);

    setValues((prev) => {
      const newState = { ...prev };

      set(newState, name, value);

      return newState;
    });
    validateField(name);
    checkDirty(name, value);
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
      onBlur(event) {
        if (mode === "onBlur") {
          onFieldChange(event, name);
        }

        addTouched(name);
      },
      ref(element) {
        const field = getField(name);

        if (field) {
          return;
        }

        setField(name, element);
        setFieldValue(element, get(values(), name));
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

  const setValue: SetValue<F> = (name, value, options = {}) => {
    setValues((prev) => {
      const newValues = { ...prev };

      set(newValues, name, value);

      return newValues;
    });

    const field = getField(name);

    setFieldValue(field, value);

    if (options.shouldValidate) {
      validateField(name);
    }

    if (options.shouldDirty) {
      checkDirty(name, value);
    }

    if (options.shouldTouch) {
      addTouched(name);
    }
  };

  const handleSubmit: HandleSubmit<F> = (onSubmit, onError) => {
    return async (event) => {
      event.preventDefault();
      await validateAllFields();

      if (isValid()) {
        onSubmit(getValues());
        return;
      }

      onError?.(errors);
      focusFirstError();
    };
  };

  const reset: Reset<F> = (values, options = {}) => {
    const newValues = values ? (values as F) : structuredClone(defaultValues);

    setValues(() => newValues);
    resetErrors();
    resetTouched(options.keepTouched);
    resetDirty(options.keepDirty);

    Object.entries(fields).forEach(([name, field]) => {
      setFieldValue(field, get(newValues, name));
    });
  };

  return {
    control,
    formState: {
      errors,
      isValid,
      isDirty,
      touchedFields,
      dirtyFields,
    },
    values,
    errors,
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
  };
};
