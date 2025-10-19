import Prism from "prismjs";
import loadLanguages from "prismjs/components/";
import { CodeProps } from "./code.types";
import sx from "./code.module.css";
import "./highlight.css";

loadLanguages(["ts", "sh"]);

const languages = {
  js: Prism.languages.js,
  ts: Prism.languages.ts,
  sh: Prism.languages.sh,
};

export const Code = (props: CodeProps) => {
  const language = props.language;
  const html = Prism.highlight(props.children, languages[language], language);

  return <code class={sx.code} innerHTML={html} />;
};
