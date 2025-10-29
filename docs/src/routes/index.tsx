import { clientOnly } from "@solidjs/start";
import { Container } from "~/components/container/container";
import { Link } from "~/components/link/link";
import { Features } from "~/components/features/features";
import sx from "./index.module.css";

const ClientForm = clientOnly(async () => ({
  default: (await import("../../../playground/src/form")).Form,
}));

const Home = () => {
  return (
    <main>
      <Container>
        <div style={{ "min-height": "calc(100vh - 120px)" }}>
          <h1 class={sx.h1}>Solid Hook Form</h1>

          <p class={sx.description}>
            Performant, flexible and extensible forms with easy-to-use validation.
          </p>

          <div class={sx.actions}>
            <Link href="/get-started" variant="button" color="primary">
              Get started
            </Link>
            <Link href="#playground" variant="button">
              Playground
            </Link>

            {/* <Link href="https://github.com/tatsmaki/solid-hook-form" target="_blank" variant="button">
            <span style={{ width: "28px", height: "28px" }} innerHTML={github} />
            GitHub
          </Link> */}
          </div>

          <Features />
        </div>

        <div id="playground">
          <h2 class={sx.h2}>
            <Link href="#playground" variant="outlined">
              Live Playground
            </Link>
          </h2>

          <div style={{ "min-height": "676px" }}>
            <ClientForm />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Home;
