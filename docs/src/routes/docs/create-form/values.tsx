import { Title } from "@solidjs/meta";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";

const Values = () => {
  return (
    <main>
      <Title>Values</Title>

      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>Values</h1>

          <p>Signal to retrieve the current values of the form.</p>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Values;
