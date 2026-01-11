import curly from "@phosphor-icons/core/regular/brackets-curly.svg?raw";
import check from "@phosphor-icons/core/regular/check-circle.svg?raw";
// import server from "@phosphor-icons/core/regular/cloud-check.svg?raw";
import upload from "@phosphor-icons/core/regular/upload-simple.svg?raw";
import { Title } from "@solidjs/meta";
import { Container } from "~/components/container/container";
import { Footer } from "~/components/footer/footer";
import { Grid } from "~/components/grid/grid";

const Examples = () => {
  return (
    <main>
      <Title>Examples</Title>

      <Container>
        <h1>Examples</h1>

        <Grid>
          <Grid.Item href="/examples/validation">
            <h2>
              <span innerHTML={check} />
              Validation
            </h2>
            <p>Apply validation rules to inputs and provide accessible error messages.</p>
          </Grid.Item>

          <Grid.Item href="/examples/zod">
            <h2>
              <img src="/zod.webp" width={32} aria-hidden />
              Zod
            </h2>
            <p>Integrate Zod schema validation into your form.</p>
          </Grid.Item>

          <Grid.Item href="/examples/yup">
            <h2>Yup</h2>
            <p>Integrate Yup schema validation into your form.</p>
          </Grid.Item>

          <Grid.Item href="/examples/async-validation">
            <h2>
              {/* <span innerHTML={server} /> */}
              Async Validation
            </h2>
            <p>Give error feedback to a user after server-side validation.</p>
          </Grid.Item>

          <Grid.Item href="/examples/multistep-form">
            <h2>Muiti-Step Form</h2>
            <p>Collect user information through different pages and sections.</p>
          </Grid.Item>

          <Grid.Item href="/examples/nested-values">
            <h2>
              <span innerHTML={curly} />
              Nested Values
            </h2>
            <p>Access object properties and array items in form fields.</p>
          </Grid.Item>

          <Grid.Item href="/examples/file-upload">
            <h2>
              <span innerHTML={upload} />
              File Upload
            </h2>
            <p>Control documents upload using native file input.</p>
          </Grid.Item>
        </Grid>

        <Footer />
      </Container>
    </main>
  );
};

export default Examples;
