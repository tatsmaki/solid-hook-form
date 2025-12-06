import { createMemo } from "solid-js";
import type { UseControllerArg, UseControllerReturn } from "./types/controller";
import type { FormValues } from "./types/form";
import { useFormContext } from "./use_form_context";
import { get } from "./utils/get";

export const useController = <F extends FormValues>(
  arg: UseControllerArg<F>
): UseControllerReturn<F> => {
  const form = useFormContext<F>();
  const control = form?.control || arg.control;
  const fieldProps = control.register(arg.name, arg.rules);

  const value = createMemo(() => {
    return get(control.values(), arg.name);
  });

  const error = createMemo(() => {
    return control.errors[arg.name];
  });

  return {
    field: {
      ...fieldProps,
      value
    },
    fieldState: {
      error
    }
  };
};
