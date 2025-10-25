import { Path } from "react-hook-form";
import { FormValues } from "../types/form";
import { Rules } from "../types/validate";

export const formatValue = <F extends FormValues, T>(value: T, rules: Rules<F, Path<F>>) => {
  if (rules.valueAsNumber) {
    return Number(value);
  }

  return value;
};
