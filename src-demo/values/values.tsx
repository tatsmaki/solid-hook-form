import { useFormContext } from "../../src/use_form_context";
import { DemoFormValues } from "../form";
import sx from "./values.module.css";

export const Values = () => {
  const { values } = useFormContext<DemoFormValues>();

  return (
    <div class={sx.values}>
      <h2>Values</h2>
      <pre>{JSON.stringify(values(), null, 2)}</pre>
    </div>
  );
};
