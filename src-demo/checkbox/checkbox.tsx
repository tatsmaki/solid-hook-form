import { createUniqueId, JSX } from "solid-js";

type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const id = createUniqueId();

  return (
    <span>
      <input id={id} type="checkbox" {...props} />
      <label for={id}>{props.label}</label>
    </span>
  );
};
