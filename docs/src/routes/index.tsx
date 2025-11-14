import { clientOnly } from "@solidjs/start";
import { Container } from "~/components/container/container";
import { Features } from "~/components/features/features";
import sx from "./index.module.css";
import { Link, cls, buttonSx } from "solid-uix";
import { Footer } from "~/components/footer/footer";

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
            <Link
              href="/get-started"
              reset
              class={cls(buttonSx.button, buttonSx.link, buttonSx.solid)}
            >
              Get started
            </Link>

            <Link
              href="#playground"
              reset
              class={cls(buttonSx.button, buttonSx.link, buttonSx.outlined)}
            >
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
            <Link href="#playground">Live Playground</Link>
          </h2>

          <div style={{ "min-height": "676px" }}>
            <ClientForm />
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
};

export default Home;
