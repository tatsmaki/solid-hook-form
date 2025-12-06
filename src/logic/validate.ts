import type { FieldError } from "../types/errors";
import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import type { Rules, ValidationRule } from "../types/validate";
import { get } from "../utils/get";

// biome-ignore lint/suspicious/noExplicitAny: value can be any
const getRuleValue = (rule: ValidationRule<any>) => {
  if (rule instanceof RegExp) {
    return rule;
  }

  if (typeof rule === "string" || typeof rule === "number") {
    return rule;
  }

  return rule.value;
};

// biome-ignore lint/suspicious/noExplicitAny: value can be any
const getRuleMessage = (rule: ValidationRule<any>) => {
  if (typeof rule === "string") {
    return rule;
  }

  if (typeof rule.message === "string") {
    return rule.message;
  }

  return "";
};

export const validate = <F extends FormValues>(
  values: F,
  name: Path<F>,
  rules: Rules<F, Path<F>> = {}
): FieldError | undefined => {
  const value = get(values, name);

  if (rules.required && !value) {
    return { type: "required", message: getRuleMessage(rules.required) };
  }

  if (rules.min && Number(value) < Number(getRuleValue(rules.min))) {
    return { type: "min", message: getRuleMessage(rules.min) };
  }

  if (rules.max && Number(value) > Number(getRuleValue(rules.max))) {
    return { type: "max", message: getRuleMessage(rules.max) };
  }

  if (rules.minLength && value.length < getRuleValue(rules.minLength)) {
    return { type: "minLength", message: getRuleMessage(rules.minLength) };
  }

  if (rules.maxLength && value.length > getRuleValue(rules.maxLength)) {
    return { type: "maxLength", message: getRuleMessage(rules.maxLength) };
  }

  if (rules.pattern && !getRuleValue(rules.pattern).test(value)) {
    return { type: "pattern", message: getRuleMessage(rules.pattern) };
  }

  if (rules.validate) {
    const message = rules.validate(value, values);

    if (message === false) {
      return { type: "validate" };
    }

    if (typeof message === "string") {
      return { type: "validate", message };
    }
  }
};
