import { Container } from "~/components/container/container";
import { Grid } from "~/components/grid/grid";
import check from "@phosphor-icons/core/regular/check-circle.svg?raw";
import textbox from "@phosphor-icons/core/regular/textbox.svg?raw";
import upload from "@phosphor-icons/core/regular/upload-simple.svg?raw";
import { Title } from "@solidjs/meta";

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

          <Grid.Item href="/examples/nested-values">
            <h2>
              <span innerHTML={textbox} />
              Nested values
            </h2>
            <p>Access object properties and array items in form fields.</p>
          </Grid.Item>

          <Grid.Item href="/examples/file-upload">
            <h2>
              <span innerHTML={upload} />
              File upload
            </h2>
            <p>Control documents upload using native file input.</p>
          </Grid.Item>
        </Grid>
      </Container>
    </main>
  );
};

export default Examples;
