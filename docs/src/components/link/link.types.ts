import { JSX } from "solid-js";

export type LinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  color?: "primary";
  variant?: "outlined" | "button";
};
