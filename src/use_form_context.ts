import { useContext } from "solid-js";
import { FormContext } from "./form_context";
import { FormValues, CreateFormReturn } from "./types/form";

export const useFormContext = <T extends FormValues>() => {
  const form = useContext(FormContext) as CreateFormReturn<T>;

  return form;
};
