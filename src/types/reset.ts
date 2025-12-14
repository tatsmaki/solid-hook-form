import type { FormValues } from "./form";
import type { Path } from "./path";

export type ResetOptions = {
  keepErrors?: boolean;
  keepValues?: boolean;
  keepTouched?: boolean;
  keepDirty?: boolean;
  keepIsSubmitted?: boolean;
  keepSubmitCount?: boolean;
};

export type Reset<F extends FormValues> = (values?: Partial<F>, options?: ResetOptions) => void;

export type ResetFieldOptions = {
  keepError?: boolean;
  keepDirty?: boolean;
  keepTouched?: boolean;
  defaultValue?: unknown;
};

export type ResetField<F extends FormValues> = (name: Path<F>, options?: ResetFieldOptions) => void;
