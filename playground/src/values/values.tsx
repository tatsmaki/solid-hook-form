import { useFormContext } from "..";
import { FormValues } from "../schema";
import sx from "./values.module.css";

export const Values = () => {
  const { values } = useFormContext<FormValues>();

  return (
    <div class={sx.values}>
      <h2>Values</h2>
      <pre>{JSON.stringify(values(), null, 2)}</pre>
    </div>
  );
};
