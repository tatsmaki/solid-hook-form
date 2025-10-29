import { useLocation } from "@solidjs/router";
import { LinkProps } from "./link.types";
import sx from "./link.module.css";
import { splitProps } from "solid-js";

export const Link = (props: LinkProps) => {
  const [local, rest] = splitProps(props, ["color", "variant"]);
  const location = useLocation();

  return (
    <a
      {...rest}
      class={[
        sx.link,
        local.color === "primary" && sx.primary,
        local.variant === "outlined" && sx.outlined,
        local.variant === "button" && sx.button,
        (rest.href === "/" ? location.pathname === "/" : location.pathname.includes(rest.href)) &&
          sx.active,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {rest.children}
    </a>
  );
};
