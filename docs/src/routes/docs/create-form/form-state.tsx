import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const FormState = () => {
  return (
    <main>
      <Title>formState - createForm</Title>

      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>formState</h1>

          <p>
            This object contains information about the entire form state. It helps you to keep on
            track with the user's interaction with your form application.
          </p>

          <p style={{ "margin-bottom": 0 }}>Returns</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["isValid", "Accessor<boolean>", "Set to true if the form doesn't have any errors."],
              ["errors", "Accessor<FieldErrors>", "Accessor to get field errors."],
            ]}
          </Table>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { formState, register, handleSubmit } = createForm()

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <button type="submit" disabled={!formState.isValid()}>Submit</button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default FormState;
