import type { FormValues } from "../types/form";
import type { Path } from "../types/path";
import type { Rules } from "../types/validate";

export const createRules = <F extends FormValues>() => {
  const rules: Record<string, Rules<F, Path<F>>> = {};

  const addRule = (name: string, options: Rules<F, Path<F>>) => {
    rules[name] = {
      required: options.required,
      min: options.min,
      max: options.max,
      minLength: options.minLength,
      maxLength: options.maxLength,
      pattern: options.pattern,
      valueAsNumber: options.valueAsNumber,
      validate: options.validate
    };
  };

  const getRule = (name: string) => {
    return rules[name];
  };

  return { rules, addRule, getRule };
};
