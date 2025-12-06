import { Prism } from "prism-esm";
import { loader as bashLoader } from "prism-esm/components/prism-bash.js";
import { loader as typescriptLoader } from "prism-esm/components/prism-typescript.js";
import type { CodeProps } from "./code.types";
import "./highlight.css";
import sx from "./code.module.css";

const prism = new Prism();

typescriptLoader(prism);
bashLoader(prism);

const languages = {
  js: prism.languages.js,
  ts: prism.languages.ts,
  sh: prism.languages.sh
};

export const Code = (props: CodeProps) => {
  const language = props.language;
  const html = prism.highlight(props.children, languages[language], language);

  return <code class={sx.code} innerHTML={html} />;
};
