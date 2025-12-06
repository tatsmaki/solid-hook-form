import type { ParentProps } from "solid-js";
import sx from "./layout.module.css";

export const Layout = (props: ParentProps) => {
  return <div class={sx.layout}>{props.children}</div>;
};
