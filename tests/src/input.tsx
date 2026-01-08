import { createUniqueId, type JSX, splitProps } from "solid-js";
import type { FieldError } from "./import";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

export const Input = (props: InputProps) => {
  const inputId = createUniqueId();
  const errorId = createUniqueId();
  const [, rest] = splitProps(props, ["error"]);

  return (
    <div style={{ display: "flex", "flex-direction": "column", position: "relative" }}>
      <label for={inputId}>{props.name}</label>
      <input
        id={inputId}
        type="text"
        aria-invalid={!!props.error}
        aria-errormessage={errorId}
        style={{ "border-color": props.error ? "red" : undefined }}
        {...rest}
      />

      {!!props.error && (
        <p
          role="alert"
          id={errorId}
          style={{ color: "red", position: "absolute", bottom: "-50%", margin: 0 }}
        >
          {props.error.message}
        </p>
      )}
    </div>
  );
};
