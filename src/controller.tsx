import { FormValues } from "./types/form";
import { ControllerProps } from "./types/controller";
import { useController } from "./use_controller";

export const Controller = <F extends FormValues>(props: ControllerProps<F>) => {
  const controller = useController(props);

  return <>{props.render(controller)}</>;
};
