import { useLocation } from "@solidjs/router";
import { LinkProps } from "./link.types";
import sx from "./link.module.css";

export const Link = (props: LinkProps) => {
  const location = useLocation();

  return (
    <a {...props} class={`${sx.link} ${location.pathname === props.href && sx.active}`}>
      {props.children}
    </a>
  );
};
