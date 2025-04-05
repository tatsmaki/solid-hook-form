import { ParentProps } from "solid-js";
import { FormValues, UseFormReturn } from "./types/form";
import { FormContext } from "./form_context";

type FormProviderProps<T extends FormValues> = ParentProps & {
  form: UseFormReturn<T>;
};

export const FormProvider = <T extends FormValues>(props: FormProviderProps<T>) => {
  return <FormContext.Provider value={props.form}>{props.children}</FormContext.Provider>;
};
