import type { Accessor } from "solid-js";
import { FieldPath, FieldPathValue, Path } from "./path";
import { FieldErrors } from "./errors";
import { Control } from "./controller";
import type { Resolver } from "react-hook-form";
import { Ref, Register } from "./register";
import { TouchedFields } from "./touched";
import { DirtyFields } from "./dirty";

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

export type SubmitHandler<F extends FormValues> = (values: F) => void;

export type SubmitErrorHandler<F extends FormValues> = (errors: FieldErrors<F>) => void;

export type HandleSubmit<F extends FormValues> = (
  onSubmit: SubmitHandler<F>,
  onError?: SubmitErrorHandler<F>
) => (event: SubmitEvent) => void;

export type ResetOptions = {
  keepTouched?: boolean;
  keepDirty?: boolean;
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
    errors: FieldErrors<F>;
    isValid: Accessor<boolean>;
    isDirty: Accessor<boolean>;
    touchedFields: Accessor<TouchedFields<F>>;
    dirtyFields: Accessor<DirtyFields<F>>;
  };
  values: Accessor<F>;
  errors: FieldErrors<F>;
  register: Register<F>;
  getValues: GetValues<F>;
  setValue: SetValue<F>;
  handleSubmit: HandleSubmit<F>;
  reset: Reset<F>;
};

export type CreateForm = <F extends FormValues>(arg: CreateFormArg<F>) => CreateFormReturn<F>;

export type FormFields = Record<string, Ref>;
