import { createMemo } from "solid-js";
import { UseController } from "./types/controller";
import { get } from "./utils/get";

export const useController: UseController = (arg) => {
  const fieldProps = arg.control.register(arg.name, arg.rules);

  const value = createMemo(() => {
    return get(arg.control.values(), arg.name);
  });

  const error = createMemo(() => {
    return arg.control.errors()[arg.name];
  });

  return {
    field: {
      value,
      ...fieldProps,
    },
    fieldState: {
      error,
    },
  };
};
