import { createUniqueId, JSX, splitProps } from "solid-js";
import sx from "./input.module.css";
import { FieldError } from "../../src/main";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export const Input = (props: InputProps) => {
  const id = createUniqueId();
  const [local, rest] = splitProps(props, ["label", "error"]);

  return (
    <span class={sx.field}>
      <label for={id} class={sx.label}>
        {local.label}
      </label>
      <input id={id} type="text" class={`${sx.input} ${local.error ? "error" : ""}`} {...rest} />
      {local.error && <span class={sx.error}>{local.error.message}</span>}
    </span>
  );
};
