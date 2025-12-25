import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const ClearErrors = () => {
  return (
    <main>
      <Title>clearErrors - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>clearErrors</h1>

          <p>This function can manually clear errors in the form.</p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`(name?: string | string[]) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <Table>
            {[
              ["Type", "Description", "Example"],
              ["undefined", "Remove all errors.", "clearErrors()"],
              ["string", "Remove single error.", 'clearErrors("email")'],
              ["string[]", "Remove multiple errors.", 'clearErrors(["email", "password"])']
            ]}
          </Table>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const form = useForm()
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors
  } = form

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <input {...register("username", { required: true })} />

      <button type="button" onClick={() => clearErrors("firstName")}>
        Clear firstName errors
      </button>

      <button
        type="button"
        onClick={() => clearErrors(["firstName", "lastName"])}
      >
        Clear firstName and lastName errors
      </button>

      <button type="button" onClick={() => clearErrors()}>
        Clear all errors
      </button>

      <button type="submit">Submit</button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default ClearErrors;
