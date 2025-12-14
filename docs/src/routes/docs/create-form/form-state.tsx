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
              [
                "isDirty",
                "Accessor<boolean>",
                "Set to true after the user modifies any of the inputs."
              ],
              ["errors", "FieldErrors", "Store proxy object with field errors."],
              [
                "dirtyFields",
                "Accessor<DirtyFields>",
                "Accessor to get user-modified fields. Make sure to provide all inputs' defaultValues via createForm, so the library can compare against the defaultValues."
              ],
              [
                "touchedFields",
                "Accessor<TouchedFields>",
                "Accessor to get all the inputs the user has interacted with."
              ],
              [
                "isSubmitted",
                "Accessor<boolean>",
                "Set to true after the form is submitted. Will remain true until the reset method is invoked."
              ],
              ["submitCount", "Accessor<number>", "Number of times the form was submitted."]
            ]}
          </Table>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const { formState, register, handleSubmit } = createForm({
    defaultValues: {
      test: ""
    }
  })
  const { isValid, isDirty, errors } = formState

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("test", { required: true })}
        aria-invalid={!!errors.test}
      />
      <button type="submit" disabled={!isValid() || !isDirty()}>
        Submit
      </button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default FormState;
