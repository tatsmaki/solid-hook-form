import { useLocation } from "@solidjs/router";
import { Link } from "solid-uix";
import { Navigation } from "~/components/navigation/navigation";

export const DocsNavigation = () => {
  const location = useLocation();

  return (
    <Navigation>
      <div>
        <Link
          href="/docs/use-form"
          color={location.pathname === "/docs/use-form" ? "accent" : "secondary"}
        >
          useForm
        </Link>
        <ul>
          <li>
            <Link
              href="/docs/use-form/register"
              color={location.pathname.includes("/docs/use-form/register") ? "accent" : "secondary"}
            >
              register
            </Link>
          </li>
          <li>
            <Link
              href="/docs/use-form/submit"
              color={location.pathname.includes("/docs/use-form/submit") ? "accent" : "secondary"}
            >
              onSubmit
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

      <Link
        href="/docs/controller"
        color={location.pathname.includes("/docs/controller") ? "accent" : "secondary"}
      >
        Controller
      </Link>
    </Navigation>
  );
};
