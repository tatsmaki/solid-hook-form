import { Path } from "react-hook-form";
import { Accessor, createMemo, JSX } from "solid-js";
import { Rules } from "./types/validate";
import { FormValues } from "./types/form";
import { get } from "./utils/get";
import { FieldError } from "./types/errors";
import { Control } from "./types/control";

type ControllerRenderArg = {
  field: {
    name: string;
    value: Accessor<any>;
    onInput(event: Event): void;
    onChange(event: Event): void;
    ref(element: HTMLElement): void;
  };
  fieldState: {
    error: Accessor<FieldError | undefined>;
  };
};

type ControllerProps<F extends FormValues> = {
  control: Control<F>;
  name: Path<F>;
  rules?: Rules<F>;
  render(arg: ControllerRenderArg): JSX.Element;
};

export const Controller = <F extends FormValues>(props: ControllerProps<F>) => {
  const fieldProps = props.control.register(props.name, props.rules);

  const value = createMemo(() => {
    return get(props.control.values(), props.name);
  });

  const error = createMemo(() => {
    return props.control.errors()[props.name];
  });

  return (
    <>
      {props.render({
        field: {
          value,
          ...fieldProps,
        },
        fieldState: {
          error,
        },
      })}
    </>
  );
};
