import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Submit = () => {
  return (
    <main>
      <Title>handleSubmit - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>handleSubmit</h1>

          <p>This function will receive the form data if form validation is successful.</p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`(onSubmit: SubmitHandler, onError?: SubmitErrorHandler) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["onSubmit", "(values: Object) => void", "A successful callback."],
              ["onError", "(errors: Object) => void", "An error callback."],
            ]}
          </Table>

          <Code language="js">{`const { register, handleSubmit } = createForm({
  defaultValues: {
    firstName: "",
    lastName: ""
  }
})

const onSubmit = (values) => {
  console.log(values);
};

const onError = (errors) => {
  console.log(errors);
};

return (
  <form onSubmit={handleSubmit(onSubmit, onError)}>
    <input {...register("firstName", { required: true })} />
    <input {...register("lastName")} />
    <button type="submit">Save</button>
  </form>
)`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Submit;
