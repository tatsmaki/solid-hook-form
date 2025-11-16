import { useLocation } from "@solidjs/router";
import { Link } from "solid-uix";
import { Navigation } from "~/components/navigation/navigation";

export const DocsNavigation = () => {
  const location = useLocation();

  return (
    <Navigation>
      <div>
        <Link
          href="/docs/create-form"
          color={location.pathname === "/docs/create-form" ? "accent" : "secondary"}
        >
          createForm
        </Link>
        <ul>
          <li>
            <Link
              href="/docs/create-form/register"
              color={
                location.pathname.includes("/docs/create-form/register") ? "accent" : "secondary"
              }
            >
              register
            </Link>
          </li>
          <li>
            <Link
              href="/docs/create-form/form-state"
              color={
                location.pathname.includes("/docs/create-form/form-state") ? "accent" : "secondary"
              }
            >
              formState
            </Link>
          </li>
          <li>
            <Link
              href="/docs/create-form/submit"
              color={
                location.pathname.includes("/docs/create-form/submit") ? "accent" : "secondary"
              }
            >
              handleSubmit
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <Link
          href="/docs/use-controller"
          color={location.pathname == "/docs/use-controller" ? "accent" : "secondary"}
        >
          useController
        </Link>
        <ul>
          <li>
            <Link
              href="/docs/use-controller/controller"
              color={
                location.pathname.includes("/docs/use-controller/controller")
                  ? "accent"
                  : "secondary"
              }
            >
              Controller
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <Link
          href="/docs/form-context"
          color={location.pathname === "/docs/form-context" ? "accent" : "secondary"}
        >
          useFormContext
        </Link>
        <ul>
          <li>
            <Link
              href="/docs/form-context/provider"
              color={
                location.pathname.includes("/docs/form-context/provider") ? "accent" : "secondary"
              }
            >
              FormProvider
            </Link>
          </li>
        </ul>
      </div>
    </Navigation>
  );
};
