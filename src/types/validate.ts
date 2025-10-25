import { Message } from "./errors";
import { FormValues } from "./form";
import { FieldPath, FieldPathValue } from "./path";

// export type ValidateResult = Message | Message[] | boolean | undefined;
export type ValidateResult = Message | boolean | undefined;

export type Validate<V, F> = (value: V, formValues: F) => ValidateResult | Promise<ValidateResult>;

export type ValidationValue = boolean | number | string | RegExp;

export type ValidationRule<V extends ValidationValue = ValidationValue> =
  | V
  | ValidationValueMessage<V>;

export type ValidationValueMessage<V extends ValidationValue = ValidationValue> = {
  value: V;
  message: Message;
};

export type Rules<F extends FormValues = FormValues, N extends FieldPath<F> = FieldPath<F>> = {
  required?: Message | ValidationRule<boolean>;
  min?: ValidationRule<number | string>;
  max?: ValidationRule<number | string>;
  maxLength?: ValidationRule<number>;
  minLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  valueAsNumber?: boolean;
  validate?: Validate<FieldPathValue<F, N>, F>;
};
