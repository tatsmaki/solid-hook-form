import type { Accessor } from "solid-js";
import { FieldPath, FieldPathValue, Path } from "./path";
import { Rules } from "./validate";
import { FieldErrors } from "./errors";
import { InputEvent, ChangeEvent } from "./event";

export type FormValues = Record<string, any>;

type RegisterReturn<F extends FormValues> = {
  name: Path<F>;
  ref(ref: HTMLInputElement | null): void;
  onInput(event: InputEvent): void;
  onChange(event: ChangeEvent): void;
};

export type Register<T extends FormValues> = (
  name: Path<T>,
  options?: Rules<T, Path<T>>
) => RegisterReturn<T>;

export type GetValues<F extends FormValues> = {
  (): F;
  <N extends FieldPath<F>>(name: N): FieldPathValue<F, N>;
  //   <N extends FieldPath<F>[]>(names: readonly [...N]): [...FieldPathValues<F, N>];
};

export type SetValue<F extends FormValues> = (
  name: Path<F>,
  value: FieldPathValue<F, Path<F>>
) => void;

type SubmitCallback<F extends FormValues> = (values: F) => void;

export type OnSubmit<F extends FormValues> = (
  submit: SubmitCallback<F>
) => (event: SubmitEvent) => void;

export type Reset<F extends FormValues> = (newDefaultValues?: Partial<F>) => void;

export type UseFormReturn<F extends FormValues = FormValues> = {
  values: Accessor<F>;
  errors: Accessor<FieldErrors<F>>;
  isValid: Accessor<boolean>;
  register: Register<F>;
  getValues: GetValues<F>;
  setValue: SetValue<F>;
  onSubmit: OnSubmit<F>;
  reset: Reset<F>;
};
