import { For, JSXElement, ParentProps, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import { NavigationProps } from "./navigation.types";
import sx from "./navigation.module.css";

export const Navigation = (props: NavigationProps) => {
  const location = useLocation();

  return (
    <aside class={sx.navigation}>
      <nav>
        <ul class={sx.links}>
          <For each={props.children}>{(item) => <li>{item}</li>}</For>

          {/* <Show when={location.pathname.endsWith("/docs") || !location.pathname.includes("/docs")}>
            <li>
              <h4>
                <Link href="/docs">Docs</Link>
              </h4>

              <Show when={location.pathname.endsWith("/docs")}>
                <ul>
                  <li>
                    <Link href="/docs/use-form">useForm</Link>
                  </li>
                  <li>
                    <Link href="/docs/form-context">useFormContext</Link>
                  </li>
                </ul>
              </Show>
            </li>
          </Show> */}

          {/* <Show when={location.pathname.includes("/use-form")}>
            <li>
              <h4>
                <Link href="/docs/use-form">useForm</Link>
              </h4>

              <ul>
                <li>
                  <Link href="/docs/use-form/register">register</Link>
                </li>
                <li>
                  <Link href="/docs/use-form/submit">onSubmit</Link>
                </li>
              </ul>
            </li>
          </Show> */}

          {/* <Show when={location.pathname.includes("/form-context")}>
            <li>
              <h4>
                <Link href="/docs/form-context">useFormContext</Link>
              </h4>

              <ul>
                <li>
                  <Link href="/docs/form-context/provider">FormProvider</Link>
                </li>
              </ul>
            </li>
          </Show> */}

          {/* <li>
            <h4>
              <Link href="/examples">Examples</Link>
            </h4>

            <Show when={location.pathname.includes("/examples")}>
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
            </Show>
          </li> */}

          {/* <li>
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
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};
