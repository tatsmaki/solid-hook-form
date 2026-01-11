import type { Path } from "react-hook-form";
import type { FormValues } from "../types/form";
import type { Rules } from "../types/validate";

export const formatValue = <F extends FormValues, T>(value: T, rules?: Rules<F, Path<F>>) => {
  if (rules?.valueAsNumber) {
    return Number(value);
  }

  return value;
};
