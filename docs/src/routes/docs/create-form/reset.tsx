import { Title } from "@solidjs/meta";
import { Code } from "~/components/code/code";
import { Container } from "~/components/container/container";
import { DocsNavigation } from "~/components/navigation/docs_navigation";
import { Table } from "~/components/table/table";

const Reset = () => {
  return (
    <main>
      <Title>reset - createForm</Title>
      <Container.Grid>
        <DocsNavigation />

        <Container.Content>
          <h1>reset</h1>

          <p>
            Reset the entire form state and fields references. There are optional arguments to allow
            partial form state reset.
          </p>

          <pre
            style={{ color: "var(--colors-accent-500)", "white-space": "break-spaces" }}
          >{`<T>(values?: T, options?: Record<string, boolean>) => void`}</pre>

          <p style={{ "margin-bottom": 0 }}>Props</p>
          <hr />

          <p>Reset has the ability to retain formState. Here are the options you may use:</p>

          <Table>
            {[
              ["Name", "Type", "Description"],
              [
                "values",
                "Object",
                "An optional object to reset form values, and it's recommended to provide the entire defaultValues when supplied",
              ],
              ["options.keepTouched", "boolean", "Retain formState.touchedFields()."],
              ["options.keepDirty", "boolean", "Retain formState.dirtyFields()."],
            ]}
          </Table>

          <p>Uncontrolled example:</p>

          <Code language="js">{`import { createForm } from "solid-hook-form"

export const ExampleForm = () => {
  const form = createForm({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  })
  const { register, handleSubmit, reset } = form

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input {...register("firstName", { required: true })} />

      <label>Last name</label>
      <input {...register("lastName")} />

      <button type="submit">Submit</button>
      <button type="reset">Default Reset</button>
      <button type="button" onClick={() => reset()}>
        Custom Reset
      </button>
    </form>
  )
}`}</Code>
        </Container.Content>
      </Container.Grid>
    </main>
  );
};

export default Reset;
