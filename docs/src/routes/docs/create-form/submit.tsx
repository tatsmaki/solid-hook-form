import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";

const Submit = () => {
  return (
    <main>
      <Title>handleSubmit - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>handleSubmit</h1>

          <p>This function will receive the form data if form validation is successful.</p>

          <blockquote>
            <p>
              Additionally, there is <b>onSubmit</b> alias for this method.
            </p>
          </blockquote>

          <Code language="js">{`const { handleSubmit } = createForm()

const onSubmit = (values) => {
  console.log(values);
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <button type="submit">Save</button>
  </form>
)`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Submit;
