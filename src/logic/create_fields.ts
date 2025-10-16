import { FormFields, Ref } from "../types/form";

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
