import type { Accessor, JSXElement } from "solid-js";
import type { FieldError, FieldErrors } from "./errors";
import type { FormValues } from "./form";
import type { Path } from "./path";
import type { Register, RegisterReturn } from "./register";
import type { Rules } from "./validate";

export type Control<F extends FormValues> = {
  values: Accessor<F>;
  errors: FieldErrors<F>;
  register: Register<F>;
};

export type UseControllerArg<F extends FormValues> = {
  control?: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
};

export type UseControllerReturn<F extends FormValues> = {
  field: RegisterReturn<F> & {
    // biome-ignore lint/suspicious/noExplicitAny: value can be any
    value: Accessor<any>;
  };
  fieldState: {
    error: Accessor<FieldError | undefined>;
  };
};

export type UseController = <F extends FormValues>(
  arg: UseControllerArg<F>
) => UseControllerReturn<F>;

export type ControllerProps<F extends FormValues> = {
  control?: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: UseControllerReturn<F>): JSXElement;
};
