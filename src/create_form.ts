import { createMemo, createSignal } from "solid-js";
import { createDirtyFields } from "./logic/create_dirty_fields";
import { createErrors } from "./logic/create_errors";
import { createFields } from "./logic/create_fields";
import { createRules } from "./logic/create_rules";
import { createSubmit } from "./logic/create_submit";
import { createTouchedFields } from "./logic/create_touched_fields";
import { formatValue } from "./logic/format_value";
import { getFieldValue } from "./logic/get_value";
import { setFieldValue } from "./logic/set_value";
import { validate } from "./logic/validate";
import type { Control } from "./types/controller";
import type { FieldError, SetError } from "./types/errors";
import type {
  CreateForm,
  CreateFormArg,
  CreateFormReturn,
  FormValues,
  GetValues,
  HandleSubmit,
  SetValue,
  Trigger
} from "./types/form";
import type { Path } from "./types/path";
import type { Register } from "./types/register";
import type { Reset } from "./types/reset";
import { get } from "./utils/get";
import { getResolverFields } from "./utils/resolver";
import { set } from "./utils/set";

export const createForm: CreateForm = <F extends FormValues>(
  arg: CreateFormArg<F>
): CreateFormReturn<F> => {
  const { defaultValues, mode = "onChange", shouldFocusError = true, resolver } = arg;

  const { fields, getField, setField, focusField } = createFields();
  const { rules, addRule, getRule } = createRules<F>();
  const [values, setValues] = createSignal<F>(structuredClone(defaultValues));
  const { errors, appendError, clearError, resetErrors, clearErrors, getError } = createErrors<F>();
  const { touchedFields, addTouched, resetTouched } = createTouchedFields<F>();
  const { dirtyFields, isDirty, checkDirty, resetDirty } = createDirtyFields<F>(defaultValues);
  const { isSubmitted, submitCount, logSubmit, resetSubmit } = createSubmit();

  const isValid = createMemo(() => {
    return !Object.keys(errors).length;
  });

  const setError: SetError<F> = (name, error, options) => {
    const field = getField(name);

    if (field) {
      error.ref = field;
    }

    appendError(name, error);

    if (options?.shouldFocus) {
      focusField(name);
    }
  };

  const renderError = (name: Path<F>, error?: FieldError) => {
    if (error) {
      setError(name, error);
    } else {
      clearError(name);
    }
  };

  const runSchema = async (names: Path<F>[]) => {
    if (!resolver) {
      return;
    }

    const result = await resolver(values() || {}, null, {
      fields: getResolverFields(fields),
      shouldUseNativeValidation: false
    });

    for (const name of names) {
      const error = get(result.errors, name);

      renderError(name, error);
    }
  };

  const validateField = async (name: Path<F>) => {
    if (resolver) {
      await runSchema([name]);

      return;
    }

    const rule = getRule(name);
    const error = validate(values(), name, rule);

    renderError(name, error);
  };

  const validateAllFields = async () => {
    if (resolver) {
      await runSchema(Object.keys(fields) as Path<F>[]);

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

    checkDirty(name, value);
  };

  const register: Register<F> = (name, options = {}) => {
    addRule(name, options);

    return {
      name,
      onInput(event) {
        onFieldChange(event, name);

        if (mode === "onChange") {
          validateField(name);
        }
      },
      onChange(event) {
        onFieldChange(event, name);

        if (mode === "onChange") {
          validateField(name);
        }
      },
      onBlur(event) {
        onFieldChange(event, name);

        if (mode === "onBlur") {
          validateField(name);
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
      }
    };
  };

  const control: Control<F> = {
    values,
    errors,
    register
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
      logSubmit();
      await validateAllFields();

      if (isValid()) {
        onSubmit(getValues());
        return;
      }

      onError?.(errors);

      if (shouldFocusError) {
        focusFirstError();
      }
    };
  };

  const reset: Reset<F> = (values, options = {}) => {
    resetSubmit(options.keepIsSubmitted, options.keepSubmitCount);
    resetErrors(options.keepErrors);
    resetTouched(options.keepTouched);
    resetDirty(options.keepDirty);

    if (options.keepValues) {
      return;
    }

    const newValues = values ? (values as F) : structuredClone(defaultValues);

    setValues(() => newValues);
    Object.entries(fields).forEach(([name, field]) => {
      setFieldValue(field, get(newValues, name));
    });
  };

  const trigger: Trigger<F> = async (name) => {
    if (!name) {
      await validateAllFields();
      return;
    }

    if (typeof name === "string") {
      validateField(name);
      return;
    }

    name.forEach(validateField);
  };

  return {
    control,
    formState: {
      errors,
      isValid,
      isDirty,
      touchedFields,
      dirtyFields,
      isSubmitted,
      submitCount
    },
    values,
    errors,
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    trigger
  };
};
