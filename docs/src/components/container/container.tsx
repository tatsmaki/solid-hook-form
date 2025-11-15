import { cls } from "solid-uix";
import sx from "./container.module.css";
import { ParentProps } from "solid-js";

export const Container = (props: ParentProps) => {
  return <div class={sx.container}>{props.children}</div>;
};

const Grid = (props: ParentProps) => {
  return <div class={cls(sx.container, sx.grid)}>{props.children}</div>;
};

const Content = (props: ParentProps) => {
  return <div class={sx.content}>{props.children}</div>;
};

Container.Grid = Grid;
Container.Content = Content;
