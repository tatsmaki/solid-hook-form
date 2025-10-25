import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";

const Submit = () => {
  return (
    <main>
      <Title>onSubmit - useForm</Title>
      <Container>
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
      </Container>
    </main>
  );
};

export default Submit;
