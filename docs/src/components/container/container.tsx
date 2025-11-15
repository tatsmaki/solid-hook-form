import { cls } from "solid-uix";
import sx from "./container.module.css";
import { ContainerProps } from "./container.types";

export const Container = (props: ContainerProps) => {
  return <div class={cls(sx.container, props.class)}>{props.children}</div>;
};
