import { Link } from "../link/link";
import sx from "./header.module.css";

export const Header = () => {
  return (
    <header class={sx.header}>
      <nav>
        <ul class={sx.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/get-started">Get started</Link>
          </li>
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          <li>
            <Link href="/examples">Examples</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
