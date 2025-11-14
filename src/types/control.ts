import type { Accessor } from "solid-js";
import { FormValues, Register } from "./form";
import { FieldErrors } from "./errors";

export type Control<F extends FormValues> = {
  values: Accessor<F>;
  errors: Accessor<FieldErrors<F>>;
  register: Register<F>;
};
