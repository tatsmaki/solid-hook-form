import { createUniqueId, JSX } from "solid-js";
import sx from "./input.module.css";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = (props: InputProps) => {
  const id = createUniqueId();

  return (
    <span class={sx.field}>
      <label for={id} class={sx.label}>
        {props.label}
      </label>
      <input id={id} type="text" class={sx.input} {...props} />
    </span>
  );
};
