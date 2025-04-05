import { useContext } from "solid-js";
import { FormContext } from "./form_context";
import { FormValues, UseFormReturn } from "./types/form";

export const useFormContext = <T extends FormValues>() => {
  const form = useContext(FormContext) as UseFormReturn<T>;

  if (!form) {
    throw new Error("useFormContext: cannot find a FormProvider");
  }

  return form;
};
