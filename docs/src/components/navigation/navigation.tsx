import { Link } from "../link/link";
import sx from "./navigation.module.css";

export const Navigation = () => {
  return (
    <aside class={sx.navigation}>
      <nav>
        <ul class={sx.links}>
          <li>
            <h4>
              <Link href="/get-started">Get started</Link>
            </h4>

            <ul>
              <li>
                <Link href="/get-started#install">Install</Link>
              </li>
              <li>
                <Link href="/get-started#register-fields">Register fields</Link>
              </li>
              <li>
                <Link href="/get-started#apply-validation">Apply validation</Link>
              </li>
              <li>
                <Link href="/get-started#typescript">TypeScript</Link>
              </li>
              <li>
                <Link href="/get-started#handle-errors">Handle errors</Link>
              </li>
            </ul>
          </li>
          <li>
            <h4>
              <Link href="/docs">Documentation</Link>
            </h4>

            <ul>
              <li>
                <Link href="/docs/use-form">useForm</Link>
              </li>
              <li>
                <Link href="/docs/form-context">useFormContext</Link>
              </li>
            </ul>
          </li>
          <li>
            <h4>
              <Link href="/examples">Examples</Link>
            </h4>

            <ul>
              <li>
                <Link href="/examples/validation">Validation</Link>
              </li>
              <li>
                <Link href="/examples/nested-values">Nested values</Link>
              </li>
              <li>
                <Link href="/examples/file-upload">File upload</Link>
              </li>
            </ul>
          </li>

          <li>
            <h4>
              <Link href="https://solid-hook-form-playground.vercel.app" target="_blank">
                Playground
              </Link>
            </h4>
          </li>

          <li>
            <h4>
              <Link href="/changelog">Changelog</Link>
            </h4>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
