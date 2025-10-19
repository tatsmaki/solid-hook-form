import { ParentProps } from "solid-js";
import sx from "./container.module.css";

export const Container = (props: ParentProps) => {
  return <div class={sx.container}>{props.children}</div>;
};
