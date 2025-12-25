import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const SetError = () => {
  return (
    <main>
      <Title>setError - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>setError</h1>

          <p>This function allows you to manually set one or more errors.</p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`(name: string, error: FieldError, options?: SetErrorOptions) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Name", "Type", "Description"],
              ["name", "string", "Input's name."],
              ["error", "FieldError", "Set an error with its type and message."],
              [
                "options.shouldFocus",
                "boolean",
                "Should focus the input during setting an error. This only works when the input's reference is registered."
              ]
            ]}
          </Table>

          <p style={{ "margin-bottom": 0 }}>Rules</p>
          <hr />

          <ul>
            <li>
              This method will not persist the associated input error if the input passes register's
              associated rules.
            </li>
            <li>
              An error that is not associated with an input field will be persisted until cleared
              with clearErrors.
            </li>
            <li>
              Can be useful in the handleSubmit method when you want to give error feedback to a
              user after async validation (for instance API returns validation errors).
            </li>
          </ul>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      email: ""
    }
  })
  const { formState, register, handleSubmit, setError } = form
  const { errors } = formState

  const onSubmit = async (values) => {
    const response = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify(values)
    })

    if (response.status !== 200) {
      setError("email", {
        type: response.status.toString()
        message: "This email is already in use"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        {...register("email")}
        aria-invalid={Boolean(errors.email)}
      />

      {errors.email && (
        <p role="alert">{errors.email.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default SetError;
