import { FormFields } from "../types/form";
import { Ref } from "../types/register";

export const createFields = () => {
  const fields: FormFields = {};

  const getField = (name: string) => {
    return fields[name];
  };

  const setField = (name: string, element: Ref) => {
    fields[name] = element;
  };

  return {
    fields,
    getField,
    setField,
  };
};
