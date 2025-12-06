import { For } from "solid-js";
import sx from "./navigation.module.css";
import type { NavigationProps } from "./navigation.types";

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
