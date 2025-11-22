import type { Accessor } from "solid-js";
import { FieldPath, FieldPathValue, Path } from "./path";
import { FieldErrors } from "./errors";
import { Control } from "./controller";
import type { Resolver } from "react-hook-form";
import { Ref, Register } from "./register";
import { TouchedFields } from "./touched";

export type FormValues = Record<string, any>;

export type GetValues<F extends FormValues> = {
  (): F;
  <N extends FieldPath<F>>(name: N): FieldPathValue<F, N>;
  //   <N extends FieldPath<F>[]>(names: readonly [...N]): [...FieldPathValues<F, N>];
};

export type SetValue<F extends FormValues> = (
  name: Path<F>,
  value: FieldPathValue<F, Path<F>>
) => void;

export type SubmitCallback<F extends FormValues> = (values: F) => void;

export type OnSubmit<F extends FormValues> = (
  submit: SubmitCallback<F>
) => (event: SubmitEvent) => void;

export type ResetOptions = {
  keepTouched?: boolean;
};

export type Reset<F extends FormValues> = (
  newDefaultValues?: Partial<F>,
  options?: ResetOptions
) => void;

export type CreateFormArg<F extends FormValues> = {
  defaultValues: F;
  mode?: "onChange" | "onSubmit" | "onBlur";
  resolver?: Resolver<F>;
};

export type CreateFormReturn<F extends FormValues = FormValues> = {
  control: Control<F>;
  formState: {
    errors: Accessor<FieldErrors<F>>;
    isValid: Accessor<boolean>;
    touchedFields: Accessor<TouchedFields<F>>;
  };
  values: Accessor<F>;
  errors: Accessor<FieldErrors<F>>;
  isValid: Accessor<boolean>;
  register: Register<F>;
  getValues: GetValues<F>;
  setValue: SetValue<F>;
  onSubmit: OnSubmit<F>;
  handleSubmit: OnSubmit<F>;
  reset: Reset<F>;
};

export type CreateForm = <F extends FormValues>(arg?: CreateFormArg<F>) => CreateFormReturn<F>;

export type FormFields = Record<string, Ref>;
