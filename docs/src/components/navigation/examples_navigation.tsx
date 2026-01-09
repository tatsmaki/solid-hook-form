import { useLocation } from "@solidjs/router";
import { Link } from "solid-uix";
import { Navigation } from "~/components/navigation/navigation";

export const ExamplesNavigation = () => {
  const location = useLocation();

  return (
    <Navigation>
      <Link
        href="/examples/validation"
        color={location.pathname.includes("/examples/validation") ? "accent" : "secondary"}
      >
        Validation
      </Link>

      <Link
        href="/examples/zod"
        color={location.pathname.includes("/examples/zod") ? "accent" : "secondary"}
      >
        Zod
      </Link>

      <Link
        href="/examples/yup"
        color={location.pathname.includes("/examples/yup") ? "accent" : "secondary"}
      >
        Yup
      </Link>

      <Link
        href="/examples/async-validation"
        color={location.pathname.includes("/examples/async-validation") ? "accent" : "secondary"}
      >
        Async Validation
      </Link>

      <Link
        href="/examples/nested-values"
        color={location.pathname.includes("/examples/nested-values") ? "accent" : "secondary"}
      >
        Nested Values
      </Link>

      <Link
        href="/examples/file-upload"
        color={location.pathname.includes("/examples/file-upload") ? "accent" : "secondary"}
      >
        File Upload
      </Link>
    </Navigation>
  );
};
