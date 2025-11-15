import { For } from "solid-js";
import { NavigationProps } from "./navigation.types";
import sx from "./navigation.module.css";

export const Navigation = (props: NavigationProps) => {
  return (
    <aside class={sx.navigation}>
      <nav>
        <ul class={sx.links}>
          <For each={props.children}>{(item) => <li>{item}</li>}</For>
        </ul>
      </nav>
    </aside>
  );
};
