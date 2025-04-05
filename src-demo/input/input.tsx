import { createUniqueId, JSX } from "solid-js";
import sx from "./input.module.css";
import { FieldError } from "../../src/main";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export const Input = (props: InputProps) => {
  const id = createUniqueId();

  return (
    <span class={sx.field}>
      <label for={id} class={sx.label}>
        {props.label}
      </label>
      <input id={id} type="text" class={`${sx.input} ${props.error ? "error" : ""}`} {...props} />
      {props.error && <span class={sx.error}>{props.error.message}</span>}
    </span>
  );
};
