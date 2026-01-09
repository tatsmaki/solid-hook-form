import type { JSX } from "solid-js";

export type StackBlitzPreviewProps = JSX.IframeHTMLAttributes<HTMLIFrameElement> & {
  src: string;
  title: string;
  height?: string;
};
