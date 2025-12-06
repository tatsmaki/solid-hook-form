import type { ParentProps } from "solid-js";
import { FormContext } from "./form_context";
import type { CreateFormReturn, FormValues } from "./types/form";

type FormProviderProps<T extends FormValues> = ParentProps & {
  form: CreateFormReturn<T>;
};

export const FormProvider = <T extends FormValues>(props: FormProviderProps<T>) => {
  return <FormContext.Provider value={props.form}>{props.children}</FormContext.Provider>;
};
