import { Link } from "solid-uix";
import sx from "./header.module.css";
import { useLocation } from "@solidjs/router";

export const Header = () => {
  const location = useLocation();

  return (
    <header class={sx.header}>
      <nav>
        <ul class={sx.links}>
          <li>
            <Link href="/" color={location.pathname === "/" ? "accent" : "secondary"}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/get-started"
              color={location.pathname.includes("/get-started") ? "accent" : "secondary"}
            >
              Get started
            </Link>
          </li>
          <li>
            <Link href="/docs" color={location.pathname.includes("/docs") ? "accent" : "secondary"}>
              Docs
            </Link>
          </li>
          <li>
            <Link
              href="/examples"
              color={location.pathname.includes("/examples") ? "accent" : "secondary"}
            >
              Examples
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
