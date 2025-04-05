import { FormValues } from "./form";
import { BrowserNativeObject, IsAny, LiteralUnion, Merge } from "./utils";
import { Rules } from "./validate";

export type FieldError = {
  type: LiteralUnion<keyof Rules, string>;
  //   root?: FieldError;
  //   ref?: Ref;
  //   types?: MultipleFieldErrors;
  message?: Message;
};

export type Message = string;

export type GlobalError = Partial<{
  type: string | number;
  message: Message;
}>;

export type DeepRequired<T> = T extends BrowserNativeObject | Blob
  ? T
  : {
      [K in keyof T]-?: NonNullable<DeepRequired<T[K]>>;
    };

export type FieldErrorsImpl<T extends FormValues = FormValues> = {
  [K in keyof T]?: T[K] extends BrowserNativeObject | Blob
    ? FieldError
    : K extends "root" | `root.${string}`
    ? GlobalError
    : T[K] extends object
    ? Merge<FieldError, FieldErrorsImpl<T[K]>>
    : FieldError;
};

export type FieldErrors<T extends FormValues = FormValues> = Partial<
  FormValues extends IsAny<FormValues> ? any : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError;
};
