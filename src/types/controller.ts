import type { Accessor, JSXElement } from "solid-js";
import { FormValues, Register } from "./form";
import { FieldError, FieldErrors } from "./errors";
import { Path } from "./path";
import { Rules } from "./validate";

export type Control<F extends FormValues> = {
  values: Accessor<F>;
  errors: Accessor<FieldErrors<F>>;
  register: Register<F>;
};

export type UseControllerArg<F extends FormValues> = {
  control: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: UseControllerReturn): JSXElement;
};

export type UseControllerReturn = {
  field: {
    name: string;
    value: Accessor<any>;
    onInput(event: Event): void;
    onChange(event: Event): void;
    ref(element: HTMLElement): void;
  };
  fieldState: {
    error: Accessor<FieldError | undefined>;
  };
};

export type UseController = <F extends FormValues>(arg: UseControllerArg<F>) => UseControllerReturn;

export type ControllerProps<F extends FormValues> = {
  control: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: UseControllerReturn): JSXElement;
};
