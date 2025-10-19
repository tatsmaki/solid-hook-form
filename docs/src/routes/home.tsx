import { Container } from "~/components/container/container";
import { Link } from "~/components/link/link";
import github from "@phosphor-icons/core/regular/github-logo.svg?raw";

const Home = () => {
  return (
    <main>
      <Container>
        <h1>Solid Hook Form</h1>

        <blockquote>
          <p>Performant, flexible and extensible forms with easy-to-use validation.</p>
        </blockquote>

        <div
          style={{
            display: "flex",
            "align-items": "center",
            margin: "48px auto",
            "flex-direction": "column",
            gap: "48px",
            "font-size": "24px",
          }}
        >
          <Link href="/get-started" style={{ color: "var(--colors-accent-500)" }}>
            Get started
          </Link>

          <Link
            href="https://solid-hook-form-playground.vercel.app"
            target="_blank"
            style={{ color: "var(--colors-accent-500)" }}
          >
            Playground
          </Link>

          <Link
            href="https://github.com/tatsmaki/solid-hook-form"
            target="_blank"
            style={{ color: "var(--colors-accent-500)" }}
          >
            <span style={{ width: "28px", height: "28px" }} innerHTML={github} />
            GitHub
          </Link>
        </div>

        <h2>Features</h2>

        <ul>
          <li>Validate forms with HTML standard based validation API</li>
          <li>Super Light (12 kB)</li>
        </ul>
      </Container>
    </main>
  );
};

export default Home;
