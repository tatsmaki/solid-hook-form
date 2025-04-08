import { createUniqueId, JSX, splitProps } from "solid-js";
import { FieldError } from "../../src/main";
import sx from "./checkbox.module.css";

type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export const Checkbox = (props: CheckboxProps) => {
  const id = createUniqueId();
  const [local, rest] = splitProps(props, ["label", "error"]);

  return (
    <span class={`${sx.field} ${local.error ? "error" : ""}`}>
      <input id={id} type="checkbox" {...rest} />
      <label for={id}>{local.label}</label>
    </span>
  );
};
