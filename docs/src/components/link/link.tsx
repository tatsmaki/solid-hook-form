import { useLocation } from "@solidjs/router";
import { LinkProps } from "./link.types";
import sx from "./link.module.css";
import { splitProps } from "solid-js";

export const Link = (props: LinkProps) => {
  const [local, rest] = splitProps(props, ["color"]);
  const location = useLocation();

  return (
    <a
      {...rest}
      class={`${sx.link} ${local.color === "primary" && sx.primary} ${
        location.pathname.includes(rest.href) && sx.active
      }`}
    >
      {rest.children}
    </a>
  );
};
