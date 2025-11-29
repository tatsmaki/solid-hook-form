import type { Accessor, JSXElement } from "solid-js";
import { FormValues } from "./form";
import { FieldError, FieldErrors } from "./errors";
import { Path } from "./path";
import { Rules } from "./validate";
import { Register, RegisterReturn } from "./register";

export type Control<F extends FormValues> = {
  values: Accessor<F>;
  errors: FieldErrors<F>;
  register: Register<F>;
};

export type UseControllerArg<F extends FormValues> = {
  control: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: UseControllerReturn<F>): JSXElement;
};

export type UseControllerReturn<F extends FormValues> = {
  field: RegisterReturn<F> & {
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
  control: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: UseControllerReturn<F>): JSXElement;
};
