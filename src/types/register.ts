import { FormValues } from "./form";
import { Path } from "./path";
import { Rules } from "./validate";

export type Ref = HTMLElement | null;

export type RegisterReturn<F extends FormValues> = {
  name: Path<F>;
  ref(ref: Ref): void;
  onInput(event: Event | unknown): void;
  onChange(event: Event | unknown): void;
  onBlur(event: FocusEvent | unknown): void;
};

export type Register<F extends FormValues> = (
  name: Path<F>,
  options?: Rules<F, Path<F>>
) => RegisterReturn<F>;
