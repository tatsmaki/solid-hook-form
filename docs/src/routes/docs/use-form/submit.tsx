import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";

const Submit = () => {
  return (
    <main>
      <Title>onSubmit - useForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>onSubmit</h1>

          <p>This function will receive the form data if form validation is successful.</p>

          <Code language="js">{`const { onSubmit } = useForm();

const onSave = (values) => {
  console.log(values);
};

return (
  <form onSubmit={onSubmit(onSave)}>
    <button type="submit">Save</button>
  </form>
);`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Submit;
