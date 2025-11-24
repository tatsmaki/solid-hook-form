import { createUniqueId, JSX, splitProps } from "solid-js";
import { FieldError } from "./import";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  error?: FieldError;
};

export const Input = (props: InputProps) => {
  const inputId = createUniqueId();
  const errorId = createUniqueId();
  const [, rest] = splitProps(props, ["error"]);

  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <label for={inputId}>{props.name}</label>
      <input
        id={inputId}
        type="text"
        aria-invalid={!!props.error}
        aria-errormessage={errorId}
        {...rest}
      />

      {!!props.error && (
        <p role="alert" id={errorId}>
          {props.error.message}
        </p>
      )}
    </div>
  );
};
