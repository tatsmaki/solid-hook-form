import type { ControllerProps } from "./types/controller";
import type { FormValues } from "./types/form";
import { useController } from "./use_controller";

export const Controller = <F extends FormValues>(props: ControllerProps<F>) => {
  const controller = useController(props);

  return <>{props.render(controller)}</>;
};
