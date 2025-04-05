import { FormValues } from "./form";
import { Path } from "./path";
import { LiteralUnion } from "./utils";
import { Rules } from "./validate";

export type Message = string;

export type FieldError = {
  type: LiteralUnion<keyof Rules, string>;
  //   root?: FieldError;
  ref?: HTMLElement;
  //   types?: MultipleFieldErrors;
  message?: Message;
};

export type FieldErrors<F extends FormValues = FormValues> = Partial<Record<Path<F>, FieldError>>;
