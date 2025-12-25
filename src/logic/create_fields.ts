import type { FormFields } from "../types/form";
import type { Ref } from "../types/register";

export const createFields = () => {
  const fields: FormFields = {};

  const getField = (name: string) => {
    return fields[name];
  };

  const setField = (name: string, element: Ref) => {
    fields[name] = element;
  };

  const focusField = (name: string) => {
    getField(name)?.focus();
  };

  return {
    fields,
    getField,
    setField,
    focusField
  };
};
