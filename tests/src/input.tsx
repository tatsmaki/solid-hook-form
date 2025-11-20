import { createUniqueId, splitProps } from "solid-js";
import { FieldError } from "../../src/main";
import { RegisterReturn } from "../../src/types/register";

type InputProps = RegisterReturn<any> & {
  error?: FieldError;
};

export const Input = (props: InputProps) => {
  const inputId = createUniqueId();
  const errorId = createUniqueId();
  const [, rest] = splitProps(props, ["error"]);

  return (
    <div>
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
