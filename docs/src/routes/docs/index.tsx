import { Container } from "~/components/container/container";
import { Grid } from "~/components/grid/grid";
import code from "@phosphor-icons/core/regular/code.svg?raw";
import { Title } from "@solidjs/meta";
import { Footer } from "~/components/footer/footer";

const Docs = () => {
  return (
    <main>
      <Title>Documentation</Title>
      <Container>
        <h1>Documentation</h1>

        <Grid>
          <Grid.Item href="/docs/use-form">
            <h2>
              <span innerHTML={code} /> useForm
            </h2>

            <p>A powerful custom hook to validate your form.</p>
          </Grid.Item>

          <Grid.Item href="/docs/use-controller">
            <h2>
              <span innerHTML={code} />
              useController
            </h2>

            <p>Custom hook for controlled inputs.</p>
          </Grid.Item>

          <Grid.Item href="/docs/form-context">
            <h2>
              <span innerHTML={code} />
              useFormContext
            </h2>

            <p>
              Access your useForm methods and properties from nested components. Great for building
              larger and multi-step forms.
            </p>
          </Grid.Item>
        </Grid>

        <Footer />
      </Container>
    </main>
  );
};

export default Docs;
