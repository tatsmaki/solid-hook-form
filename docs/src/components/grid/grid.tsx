import { ParentProps } from "solid-js";
import sx from "./grid.module.css";

export const Grid = (props: ParentProps) => {
  return <ul class={sx.grid}>{props.children}</ul>;
};

type GridItemProps = ParentProps & {
  href?: string;
};

const GridItem = (props: GridItemProps) => {
  return (
    <li class={sx.item}>
      <a class={sx.link} href={props.href}>
        {props.children}
      </a>
    </li>
  );
};

Grid.Item = GridItem;
