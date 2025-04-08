import { createUniqueId, JSX, splitProps } from "solid-js";
import sx from "./select.module.css";
import { FieldError } from "../../src/main";

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: FieldError;
};

export const Select = (props: SelectProps) => {
  const id = createUniqueId();
  const [local, rest] = splitProps(props, ["label", "error"]);

  return (
    <span class={sx.field}>
      <label for={id} class={sx.label}>
        {local.label}
      </label>
      <select id={id} class={`${sx.select} ${local.error ? "error" : ""}`} {...rest}>
        {props.children}
      </select>
      {local.error && <span class={sx.error}>{local.error.message}</span>}
    </span>
  );
};
