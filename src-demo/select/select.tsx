import { createUniqueId, JSX } from "solid-js";
import sx from "./select.module.css";

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export const Select = (props: SelectProps) => {
  const id = createUniqueId();

  return (
    <span class={sx.field}>
      <label for={id} class={sx.label}>
        {props.label}
      </label>
      <select id={id} class={sx.select} {...props}>
        {props.children}
      </select>
    </span>
  );
};
