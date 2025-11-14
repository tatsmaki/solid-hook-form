import { Link } from "solid-uix";
import sx from "./footer.module.css";

export const Footer = () => {
  return (
    <footer class={sx.footer}>
      <Link href="/" color="secondary">
        Home
      </Link>
      <Link href="/get-started" color="secondary">
        Get started
      </Link>
      <Link href="/docs" color="secondary">
        Docs
      </Link>
      <Link href="/examples" color="secondary">
        Examples
      </Link>
      <Link href="/changelog" color="secondary">
        Changelog
      </Link>
      <Link href="https://github.com/tatsmaki/solid-hook-form" target="_blank" color="secondary">
        <img width={24} height={24} src="/github.svg" />
        GitHub
      </Link>
      <Link href="https://www.npmjs.com/package/solid-hook-form" target="_blank" color="secondary">
        <img width={24} height={24} src="/npm.svg" />
        solid-hook-form
      </Link>
    </footer>
  );
};
