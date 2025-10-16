import { FormValues } from "./form";
import { Rules } from "./validate";
import {
  LiteralUnion,
  // IsAny,
  // BrowserNativeObject,
  // DeepRequired,
  // GlobalError,
  // Merge,
  Path,
} from "react-hook-form";

export type Message = string;

export type FieldError = {
  type: LiteralUnion<keyof Rules, string>;
  //   root?: FieldError;
  ref?: HTMLElement;
  //   types?: MultipleFieldErrors;
  message?: Message;
};

// type FieldErrorsImpl<T extends FormValues = FormValues> = {
//   [K in keyof T]?: T[K] extends BrowserNativeObject | Blob
//     ? FieldError
//     : K extends "root" | `root.${string}`
//     ? GlobalError
//     : T[K] extends object
//     ? Merge<FieldError, FieldErrorsImpl<T[K]>>
//     : FieldError;
// };

// export type FieldErrors<F extends FormValues = FormValues> = Partial<
//   FormValues extends IsAny<FormValues> ? any : FieldErrorsImpl<DeepRequired<F>>
// > & {
//   root?: Record<string, GlobalError> & GlobalError;
// };

export type FieldErrors<F extends FormValues = FormValues> = Partial<Record<Path<F>, FieldError>>;
